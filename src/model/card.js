var CARD_MODEL_MAP = {};

var getCardName = function(type){
    return texts.card[type].name;
}
var getCardDesc = function(type, level){
    var desc = texts.card[type].desc;
    if ( typeof desc === "function" ) {
        return desc(level);
    } else return desc;
}

var CardModel = Backbone.Model.extend({
    defaults: function () {
        return {
            type: "",

            level: 1,
            maxLevel: 1,
            waitTurn: 0,
            isShowLevel: true
        }
    },
    initialize: function () {

    },
    getName:function(){
        return getCardName(this.get("type"));
    },
    getDescription:function(){
        return getCardDesc(this.get("type"), this.get("level"));
    },
    getWait:function(){
        return this.get("waitTurn")
    },
    reduceWait:function(amount){
        this.set("waitTurn", Math.max(0,this.get("waitTurn") - amount));
    },
    canUse:function(){
        return this.get("waitTurn") <= 0;
    },
    onGain:function(){
    },
    use:function(){
        currentRoom.blockInput();
        this.onUse();
        this.trigger("use",this);
        currentRoom.discardCard(this);
    },
    onUse:function(){
    },
    afterUse:function(){ // call by view
        currentRoom.unblockInput();
        if ( currentRoom.passCheckCondition() ) {
            currentRoom.getHero().checkLevelUp(); //maybe level up after use card
        }
    },
    onExile:function(){
    },
    onDraw:function(){
        this.set("waitTurn",this.waitTurnOfLevel(this.get("level")));
    },
    onLevelUp:function(){

    },
    discard:function(){
        this.onDiscard();
        this.trigger("discard", this);
    },
    onDiscard:function(){
    },
    restoreToOrigin:function(){
        //TODO restore status that card buff or debuff
    },
    waitTurnOfLevel:function(level){
        return 0;
    }
});

var PassiveCardModel = CardModel.extend({

})

CARD_MODEL_MAP.heal = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "heal",
            maxLevel: 10
        })
    },

    onUse:function(){
        currentRoom.getHero().gainHp(this.getEffect())
    },
    waitTurnOfLevel:function(level){
        return level+4;
    },
    getEffect:function(){
        var l = 2*this.get("level")+1;
        return l;
    }
})

CARD_MODEL_MAP["tail-slash"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "tail-slash",
            maxLevel: 3
        })
    },
    waitTurnOfLevel:function(level){
        return 4-level;
    },
    onUse:function(){
        var hero = currentRoom.getHero();
        var movable = currentRoom.getMovableByPosition(getDecrementsPosition(hero.get("positions")[0], hero.get("face")));
        if (movable instanceof EnemyModel && movable.canBeAttack("skill")) {
            hero.attack(movable,{
                attackType : "skill",
                attackAction: "tail-slash",
                onHit: function(enemy, opt){
                    enemy.beHit(hero, opt);
                },
                onMiss: function(enemy, opt){
                    enemy.dodgeAttack(hero, opt);
                },
                context: this
            });
        }
    }
})

CARD_MODEL_MAP["vertical-fire"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "vertical-fire",
            maxLevel: 5
        })
    },
    waitTurnOfLevel:function(level){
        return 11-level;
    },
    onUse:function(){
        var hero = currentRoom.getHero();
        var heroPosition = hero.get("positions")[0];

        for ( var i = 0; i < currentRoom.getHeight(); i++ ) {
            var movable = currentRoom.getMovableByPosition(heroPosition.x, i);
            if (movable instanceof EnemyModel && movable.canBeAttack("magic")) {
                hero.attack(movable,{
                    attackType : "magic",
                    attackAction: "fire",
                    onHit: function(enemy, opt){
                        enemy.beHit(hero, opt);
                    },
                    onMiss: function(enemy, opt){
                        enemy.dodgeAttack(hero, opt);
                    },
                    context: this
                });
            }
        }
    }
})

CARD_MODEL_MAP["horizontal-fire"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "horizontal-fire",
            maxLevel: 5
        })
    },
    waitTurnOfLevel:function(level){
        return 11-level;
    },
    onUse:function(){
        var hero = currentRoom.getHero();
        var heroPosition = hero.get("positions")[0];

        for ( var i = 0; i < currentRoom.getWidth(); i++ ) {
            var movable = currentRoom.getMovableByPosition(i,heroPosition.y);
            if (movable instanceof EnemyModel && movable.canBeAttack("magic")) {
                hero.attack(movable,{
                    attackType : "magic",
                    attackAction: "fire",
                    onHit: function(enemy, opt){
                        enemy.beHit(hero, opt);
                    },
                    onMiss: function(enemy, opt){
                        enemy.dodgeAttack(hero, opt);
                    },
                    context: this
                });
            }
        }
    }
})

CARD_MODEL_MAP["cross-fire"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "cross-fire",
            maxLevel: 5
        })
    },
    waitTurnOfLevel:function(level){
        return 29-level;
    },
    onUse:function(){
        var hero = currentRoom.getHero();
        var heroPosition = hero.get("positions")[0];

        for ( var i = 0; i < currentRoom.getHeight(); i++ ) {
            var movable = currentRoom.getMovableByPosition(heroPosition.x, i);
            if (movable instanceof EnemyModel && movable.canBeAttack("magic")) {
                hero.attack(movable,{
                    attackType : "magic",
                    attackAction: "fire",
                    onHit: function(enemy, opt){
                        enemy.beHit(hero, opt);
                    },
                    onMiss: function(enemy, opt){
                        enemy.dodgeAttack(hero, opt);
                    },
                    context: this
                });
            }
        }

        for ( var i = 0; i < currentRoom.getWidth(); i++ ) {
            var movable = currentRoom.getMovableByPosition(i,heroPosition.y);
            if (movable instanceof EnemyModel && movable.canBeAttack("magic")) {
                hero.attack(movable,{
                    attackType : "magic",
                    attackAction: "fire",
                    onHit: function(enemy, opt){
                        enemy.beHit(hero, opt);
                    },
                    onMiss: function(enemy, opt){
                        enemy.dodgeAttack(hero, opt);
                    },
                    context: this
                });
            }
        }
    }
})

CARD_MODEL_MAP["whirl-slash"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "whirl-slash",
            maxLevel: 5
        })
    },
    waitTurnOfLevel:function(level){
        return 25-level;
    },
    onUse:function(){
        var hero = currentRoom.getHero();
        var heroPosition = hero.get("positions")[0];

        for ( var i = heroPosition.x-1; i < heroPosition.x+2; i++ ) {
            for ( var j = heroPosition.y-1; j < heroPosition.y+2; j++ ) {
                var movable = currentRoom.getMovableByPosition(i, j);
                if (movable instanceof EnemyModel && movable.canBeAttack("skill")) {
                    hero.attack(movable, {
                        attackType: "skill",
                        attackAction: "whirl-slash",
                        onHit: function (enemy, opt) {
                            enemy.beHit(hero, opt);
                        },
                        onMiss: function (enemy, opt) {
                            enemy.dodgeAttack(hero, opt);
                        },
                        context: this
                    });
                }
            }
        }
    }
})

//passive card
CARD_MODEL_MAP["luck"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "luck",
            maxLevel: 5
        })
    },
    getEffect:function(level){
        level = level || this.get("level")
        return 3+level;
    },
    onLevelUp:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") + 1 )
    },
    onGain:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") + 3 )
    },
    onExile:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") - this.getEffect() )
    }
})

CARD_MODEL_MAP["constitution"] = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "constitution",
            maxLevel: 5
        })
    },
    getEffect:function(level){
        level = level || this.get("level")
        return 10+level*5;
    },
    onLevelUp:function(){
        hero.set("maxHp",hero.get("maxHp") + 5 )
        hero.set("hp", hero.get("hp") + 5 );
    },
    onGain:function(){
        var hero = currentRoom.getHero();
        hero.set("maxHp",hero.get("maxHp") + 10 )
        hero.set("hp", hero.get("hp") + 10 );
    },
    onExile:function(){
        var hero = currentRoom.getHero();
        hero.set("maxHp",hero.get("maxHp") - this.getEffect() )
        hero.set("hp",Math.min(hero.get("hp"), hero.get("maxHp") ) )
    }
})