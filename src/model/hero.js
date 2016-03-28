var HeroModel = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            type: "normalHero",
            exp: 0,

            forwardAfterKill: true,
            //inactive skill
            cunning: 0
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
            return Math.round((Math.log10(lv) * lv * 16.61 + 10) * (1 - (CUNNING_EFFECT / 100) * this.get("cunning")) * EXP_INFLATION_RATE);
        } else if ( this.get("expStrategy").type === "fix" ) {
            return this.get("expStrategy").value * EXP_INFLATION_RATE
        }
    },
    loseHp:function(damage){
        cc.log("lose hp " + damage)
        this.set("hp", Math.max(0, this.get("hp") - damage) )
    },
    gainHp:function(amount){
        this.set("hp", Math.min(this.get("maxHp"), this.get("hp") + amount) )
    },
    gainExp:function(amount){
        this.useRemainExp(amount);
    },
    useRemainExp:function(amount){
        var remainExp = this.get("exp") + amount - this.get("requireExp");
        if ( remainExp < 0 ) {
            this.set("exp", this.get("exp")+amount );
        } else {
            if ( currentRoom.get("rules").heroCanLevelUp ) {
                this.set({
                    exp: 0,
                    level: this.get("level") + 1,
                    requireExp: this.requireExpOfLevel(this.get("level") + 1)
                });
                this.levelUp(this.get("level"));
            }
        }
    },
    canAttack:function(){
        return true
    },
    afterMove:function(opt){ //override
        MovableModel.prototype.afterMove.call(this, opt);


    },
    beforeNormalAttack:function(enemy){
    },
    normalAttack:function(enemy){
        this.beforeNormalAttack(enemy)
        enemy.beforeBeAttacked(this);
        this.trigger("attack",this, enemy)
    },
    hitOrMiss:function(enemy){ //called by view
        if ( enemy.checkHit(this) ) {
            //hit
            this.hit(enemy);
            enemy.beHit(this);
            return true;
        } else {
            //miss
            this.miss(enemy);
            enemy.dodgeAttack(this);
            return false;
        }
    },
    afterMiss:function(enemy){ //called by view
        this.afterNormalAttack(enemy)
    },
    beforeHit:function(enemy){
    },
    hit:function(enemy){
        this.beforeHit(enemy);
        if ( this.get("forwardAfterKill") ) {
            this.trigger("hitForward", this, enemy);
        } else {
            this.trigger("hitMoveBack", this, enemy);
        }
    },
    afterHit:function(enemy){ //called by view
        if ( this.get("forwardAfterKill") ) {
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
        currentRoom.trigger("hero-attack-complete",currentRoom)
    },
    beforeBeAttacked:function(enemy){
    },
    checkHit:function(enemy){
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
    }
})

MOVABLE_MODEL_MAP.normalHero = HeroModel;