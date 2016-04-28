var LUCK_EFFECT = 0.01;
var CUNNING_EFFECT = 0.01;
var DEXTERITY_EFFECT = 0.01;
var DODGE_EFFECT = 0.01;

var HeroModel = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            type: "normalHero",
            exp: 0,
            unusedExp: 0,

            forwardAfterKillEnemy: false,
            choiceNumber: 3,
            //passive status
            constitute: 0,
            cunning: 0,
            maxCunning: 50,
            dexterity: 0,
            maxDexterity: 50,
            dodge: 0,
            maxDodge: 75,
            luck: 5,
            maxLuck: 50,
            
            maxHand: 4,
            drawEachTurn: 1,
            isShowLevel:false
        } )
    },
    initialize:function(){
        MovableModel.prototype.initialize.call(this);

        this.set("maxHp",this.get("initMaxHp") || this.maxHpOfLevel());
        this.set("hp",this.get("initHp") || this.get("maxHp"));
        this.set("requireExp",this.get("initRequireExp") || this.requireExpOfLevel());
    },
    getPosition:function(){
        return this.get("positions")[0];
    },
    maxHpOfLevel:function(lv){
        if ( !this.get("maxHpStrategy") || this.get("maxHpStrategy").type === "normal" ) {
            var level = lv || this.get("level");
            return level * 5 + 5;
        } else if ( this.get("maxHpStrategy").type === "fix" ) {
            return this.get("maxHpStrategy").value;
        }
    },
    requireExpOfLevel:function(lv){
        if ( !this.get("expStrategy") || this.get("expStrategy").type === "normal" ) {
            var lv = lv || this.get("level")
            return Math.round((Math.log10(lv) * lv * 16.61 + 10) * (1 - CUNNING_EFFECT * this.get("cunning")) ) * EXP_INFLATION_RATE;
        } else if ( this.get("expStrategy").type === "fix" ) {
            return this.get("expStrategy").value * EXP_INFLATION_RATE
        }
    },
    loseHp:function(damage){
        this.set("hp", Math.max(0, this.get("hp") - damage) );
        if ( this.get("hp") <= 0 ) {
            this.onDie();
        }
    },
    onDie:function(){
        this.trigger("die",this);
    },
    gainHp:function(amount){
        this.set("hp", Math.min(this.get("maxHp"), this.get("hp") + amount) )
    },
    gainExp:function(amount){
        if ( currentRoom.get("rules").heroCanGetExp ) {
            this.set("unusedExp", this.get("unusedExp") + amount);
            this.useRemainExp();
        }
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
            this.levelUp(1);
            return true;
        }
        return false;
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
            attackType : "normal",
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
        if ( enemy.get("heroForwardAfterKillMe") && this.get("forwardAfterKillEnemy")) {
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
    checkHit:function(enemy, options){
        var attackType = enemy.get("attackType");
        if ( ( attackType === ATTACK_TYPE_MELEE && Math.random() < this.get("dexterity")*DEXTERITY_EFFECT ) ||
        ( attackType === ATTACK_TYPE_PROJECTILE && Math.random() < this.get("dodge")*DODGE_EFFECT )
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
        this.loseHp(damage);
    },
    afterTakeDamage:function(enemy, damage){ //called by view
    },
    afterBeMerged:function(movable){
        if ( movable instanceof ItemModel ) {
            movable.taken();
        }
    }
})

MOVABLE_MODEL_MAP.normalHero = HeroModel;
