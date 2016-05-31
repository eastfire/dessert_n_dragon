var ORIGIN_CONSTITUTION_EFFECT = 5;
var ORIGIN_CHOICE_NUMBER = 3;

var LUCK_EFFECT = 0.01;
var CUNNING_EFFECT = 0.01;
var DEXTERITY_EFFECT = 0.01;
var DODGE_EFFECT = 0.01;
var RECOVERY_EFFECT = 0.01;
var CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;

var NEGATIVE_EFFECT_TIME_ADJUST = 0;

var NEGATIVE_EFFECTS = ["frozen","cursed","dizzy","forbidDraw","poison"]
var AUTO_DECREASE_EFFECTS = ["dizzy","forbidDraw","dispel","poison"] //freeze is handle in Movable

var HeroModel = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            type: "normalHero",
            exp: 0,
            unusedExp: 0,

            forwardAfterKillEnemy: false,
            choiceNumber: ORIGIN_CHOICE_NUMBER,
            //passive status
            constitution: 4,
            cunning: 0,
            maxCunning: 50,
            dexterity: 0,
            maxDexterity: 50,
            dodge: 0,
            maxDodge: 75,
            luck: 5,
            maxLuck: 60,
            recovery: 100,
            maxRecovery: 100,
            collector: 0,
            maxCollector: 10,
            
            maxHand: 2,
            drawEachTurn: 1,
            isShowLevel:false,
            
            buff: {},
            debuff: {},

            forbidDraw: 0,
            cursed: 0
        } )
    },
    initialize:function(){
        MovableModel.prototype.initialize.call(this);
        for ( var i = 1; i <= 10; i++ ) {
            if ( unlockedStatus.isUnlocked("initHp"+i) ) {
                this.set("constitution",this.get("constitution")+2);
            }
        }

        this.set("maxHp",this.get("maxHp") || this.maxHpOfLevel());

        this.set("hp",this.get("hp") || this.get("maxHp"));
        this.set("requireExp",this.get("requireExp") || this.requireExpOfLevel());
    },
    onTurnStart:function(){
        MovableModel.prototype.onTurnStart.call(this);
        this.checkPoison();
        this.set({buff:{}});
        _.each(AUTO_DECREASE_EFFECTS,function(effect){
            this.set(effect, Math.max(0, this.get(effect) - 1 ))
        },this);
    },
    getPoisonEffect:function(){
        return 1;
    },
    checkPoison:function(){
        if (this.get("poison")) {
            this.loseHp(this.getPoisonEffect(), {
                category: "poison",
                type:"poison"
            });
        }
    },
    getPosition:function(){
        return this.get("positions")[0];
    },
    maxHpOfLevel:function(lv){
        return Math.round(this.get("constitution")*CONSTITUTION_EFFECT);
    },
    requireExpOfLevel:function(lv){
        if ( !this.get("expStrategy") || this.get("expStrategy").type === "normal" ) {
            var lv = lv || this.get("level")
            return Math.round(Math.round((Math.log10(lv) * lv * 16.61 + 10) * EXP_INFLATION_RATE ) * (1 - CUNNING_EFFECT * this.get("cunning")))
        } else if ( this.get("expStrategy").type === "fix" ) {
            return this.get("expStrategy").value * EXP_INFLATION_RATE
        }
    },
    loseHp:function(damage, cause){
        this.set("hp", Math.max(0, this.get("hp") - damage) );
        if ( this.get("hp") <= 0 ) {
            this.onDie(cause);
        }
    },
    onDie:function(cause){
        //statistic
        statistic["hero-die"] = statistic["hero-die"] || 0;
        statistic["hero-die"]++;

        this.set("killedBy",cause);
        this.trigger("die",this);
    },
    gainHp:function(amount){
        var realAmount = Math.min( this.get("maxHp") - this.get("hp"), amount);
        if ( this.get("cursed") ) {
            realAmount = Math.round(realAmount/2);
            this.set("cursed",0);
        }
        this.set("hp", this.get("hp") + realAmount );

        //statistic
        statistic["gain-hp"] = statistic["gain-hp"] || 0;
        statistic["gain-hp"]+=realAmount;
    },
    gainExp:function(amount){
        if ( currentRoom.get("rules").heroCanGetExp ) {
            this.set("unusedExp", this.get("unusedExp") + amount);

            //statistic
            statistic["gain-exp"] = statistic["gain-exp"] || 0;
            statistic["gain-exp"]+=amount;

            this.useRemainExp();
        }
    },
    gainBuff:function(type, amount){
        var buff = this.get("buff")
        buff[type] = buff[type] || 0;
        buff[type]+=amount;
    },
    useRemainExp:function(){
        var amount = this.get("unusedExp");
        var remainExp = this.get("exp") + amount - this.get("requireExp");
        if ( remainExp < 0 ) {
            this.set({
                exp: this.get("exp")+amount,
                unusedExp: 0
            });
        } else {
            if ( currentRoom.get("rules").heroCanLevelUp ) {
                this.set({
                    exp: this.get("requireExp"),
                    unusedExp: remainExp
                });
            }
        }
    },
    checkLevelUp:function(){
        if ( currentRoom.get("rules").heroCanLevelUp && this.get("exp") >= this.get("requireExp") ) {
            this.set({
                exp: 0,
                requireExp: this.requireExpOfLevel(this.get("level") + 1)
            });
            this.set("constitution",this.get("constitution")+1);
            this.calculateMaxHp();
            this.gainHp(this.get("maxHp") - this.get("hp"));
            this.levelUp(1);
            return true;
        }
        return false;
    },
    calculateMaxHp:function(){
        this.set("maxHp", this.maxHpOfLevel(this.get("level")));
        this.set("hp", Math.min(this.get("hp"),this.get("maxHp")));
    },
    canAttack:function(){
        return true
    },
    afterMove:function(opt){ //override
        MovableModel.prototype.afterMove.call(this, opt);


    },
    beforeAttack:function(enemy, options){
    },
    attack:function(enemy, options){ //options: attackType, attackAction, onHit,context, onMiss
        this.beforeAttack(enemy, options);
        enemy.beforeBeAttacked(this, options);
        this.trigger("attack",enemy, options)
    },
    normalAttack:function(enemy) {
        var options = {
            attackType : ATTACK_TYPE_MELEE,
            attackAction: "normal",
            onHit: function(enemy, opt){
                this.hit(enemy, options);
                enemy.beHit(this, options);
            },
            onMiss: function(enemy, opt){
                this.miss(enemy, options);
                enemy.dodgeAttack(this, options);
            },
            context: this
        }
        this.attack(enemy, options);
    },
    hitOrMiss:function(enemy, options){ //called by view
        if ( enemy.checkHit(this, options) ) {
            if ( options.onHit ) options.onHit.call(options.context, enemy);
            return true;
        } else {
            if ( options.onMiss ) options.onMiss.call(options.context, enemy);
            return false;
        }
    },
    afterMiss:function(enemy){ //called by view
        this.afterNormalAttack(enemy)
    },
    beforeHit:function(enemy){
    },
    hit:function(enemy, options){
        this.beforeHit(enemy, options);
        if ( !this.get("frozen") && enemy.heroCanMoveForward() && this.get("forwardAfterKillEnemy")) {
            this.__forwardAfterKill = true;
            this.trigger("hitForward", this, enemy);
        } else {
            this.__forwardAfterKill = false;
            this.trigger("hitMoveBack", this, enemy);
        }
    },
    afterHit:function(enemy, options){ //called by view
        if ( this.__forwardAfterKill ) {
            //remove old mapping
            currentRoom.__movableMap[this.get("positions")[0].x][this.get("positions")[0].y] = null; //hero is only size 1
            //move to new position
            var newPosition = getIncrementPosition(this.get("positions")[0], this.get("face"))
            currentRoom.__movableMap[newPosition.x][newPosition.y] = this;
            this.get("positions")[0] = {
                x: newPosition.x,
                y: newPosition.y
            }
            this.calculateEdgePositions();
        }
        this.afterNormalAttack(enemy)
    },
    beforeMiss:function(enemy){
    },
    miss:function(enemy){
        this.beforeMiss(enemy);
        this.trigger("miss", this, enemy);
    },
    afterMiss:function(enemy){ //called by view
        this.afterNormalAttack(enemy)
    },
    afterNormalAttack:function(enemy){ //called by view
        this.trigger("attack-complete",this)
        currentRoom.nextPhase();
    },
    beforeBeAttacked:function(enemy){
    },
    getProp:function(propName){
        var prop = this.get(propName);
        var buff = this.get("buff");
        buff[propName] = buff[propName] || 0;
        return prop + buff[propName]
    },
    checkHit:function(enemy, options){
        var attackType = enemy.get("attackType");
        if ( ( attackType === ATTACK_TYPE_MELEE && Math.random() < this.getProp("dexterity")*DEXTERITY_EFFECT ) ||
        ( attackType === ATTACK_TYPE_RANGE && Math.random() < this.getProp("dodge")*DODGE_EFFECT )
        ) {
            return false;
        }
        return true;
    },
    beforeBeHit:function(enemy, attackPoint){
    },
    beHit:function(enemy, attackPoint){
        this.beforeBeHit(enemy, attackPoint);
        this.trigger("beHit",this, enemy);
        return attackPoint;
    },
    afterBeHit:function(enemy, attackPoint){ //called by view
        this.afterBeAttacked(enemy)
    },
    blocked:function(attackPoint){
        this.trigger("blocked")
    },
    beforeDodgeAttack:function(enemy){
    },
    dodgeAttack:function(enemy){
        this.beforeDodgeAttack(enemy);
        this.trigger("dodgeAttack",this, enemy);
    },
    afterDodgeAttack:function(enemy){ //called by view
        this.afterBeAttacked(enemy);
    },
    afterBeAttacked:function(enemy){
    },

    beforeDie:function(enemy){
    },
    afterDie:function(enemy){
    },
    beforeTakeDamage:function(enemy, damage){
    },
    takeDamage:function(enemy, damage){
        this.beforeTakeDamage(enemy, damage)
        this.trigger("takeDamage", this, enemy, damage);
        this.loseHp(damage, {
            category:"enemy",
            type:enemy.get("type"),
            subtype:enemy.get("subtype"),
            level: enemy.get("level")
        });
    },
    afterTakeDamage:function(enemy, damage){ //called by view
    },
    afterBeMerged:function(movable){
        if ( movable instanceof ItemModel ) {
            movable.taken();
        }
    },
    getDrawCount:function(){
        if (this.get("forbidDraw") ) return 0;
        else return this.get("drawEachTurn")
    },
    getNegativeEffect:function(negative, amount){
        if ( this.get("dispel") ) return;
        this.set(negative,Math.max(0,Math.max(amount,this.get(negative))+NEGATIVE_EFFECT_TIME_ADJUST));
    },
    getFrozen:function(amount){
        this.getNegativeEffect("frozen",amount);
    },
    getDisturb:function(amount){
        if ( this.get("dispel") ) return;
        _.each(currentRoom.getHand(),function(cardModel){
            if ( cardModel.get("waitTurn") ) {
                cardModel.disturb(amount+NEGATIVE_EFFECT_TIME_ADJUST);
            }
        });
    },
    afterTeleport:function(){
        MovableModel.prototype.afterTeleport.call(this);
        currentRoom.foreachMovable(function(movable){
            if (!( movable instanceof HeroModel )) {
                movable.afterHeroTeleport();
            }
        },this);
    },
    dispel:function(){
        this.set({
                dispel: 1
            });
        _.each(NEGATIVE_EFFECTS,function(negative){
            this.set(negative, 0)
        },this);
    }
})

MOVABLE_MODEL_MAP.normalHero = HeroModel;
