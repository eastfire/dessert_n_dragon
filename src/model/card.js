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

var getCardLevelUpDesc = function(type, level){
    var desc = texts.card[type].levelUpDesc;
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
    levelUp:function(amount){
        this.set("level",this.get("level")+amount)
        this.onLevelUp();
    },
    canLevelUp:function(){
        return this.get("level") < this.get("maxLevel")
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
        currentRoom.getHero().gainHp(ARD_MODEL_MAP.heal.getEffect(this.get("level")))
    },
    waitTurnOfLevel:function(level){
        return level+4;
    }
})
CARD_MODEL_MAP.heal.getEffect = function(level){
    level = level || 1;
    return 2*l + 1;
}

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
    },
    onLevelUp:function(){
        this.reduceWait(1);
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
    },
    onLevelUp:function(){
        this.reduceWait(1);
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
    },
    onLevelUp:function(){
        this.reduceWait(1);
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
        return 30-level*2;
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
    },
    onLevelUp:function(){
        this.reduceWait(2);
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
        return 27-level*2;
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
    },
    onLevelUp:function(){
        this.reduceWait(2);
    }
})

//passive card

CARD_MODEL_MAP.constitution = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "constitution",
            maxLevel: 5
        })
    },
    onLevelUp:function(){
        var diff = CARD_MODEL_MAP.constitution.getEffectDiff(this.get("level"));
        hero.set("maxHp",hero.get("maxHp") + diff )
        hero.set("hp", hero.get("hp") + diff );
    },
    onGain:function(){
        var hero = currentRoom.getHero();
        var effect = CARD_MODEL_MAP.constitution.getEffect(this.get("level"));
        hero.set("maxHp",hero.get("maxHp") + effect )
        hero.set("hp", hero.get("hp") + effect );
    },
    onExile:function(){
        var hero = currentRoom.getHero();
        var effect = CARD_MODEL_MAP.constitution.getEffect(this.get("level"));
        hero.set("maxHp",hero.get("maxHp") - effect )
        hero.set("hp",Math.min(hero.get("hp"), hero.get("maxHp") ) )
    }
})
CARD_MODEL_MAP.constitution.getEffect = function(level){
    level = level || 1;
    return level*5+5;
}
CARD_MODEL_MAP.constitution.getEffectDiff = function(currentLevel, targetLevel){
    targetLevel = targetLevel || currentLevel+1;
    return 5;
}

CARD_MODEL_MAP.cunning = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "cunning",
            maxLevel: 5
        })
    },
    canLevelUp:function(){
        return CardModel.prototype.canLevelUp.call(this) && currentRoom.getHero().get("cunning") < currentRoom.getHero().get("maxCunning")
    },
    onLevelUp:function(){
        currentRoom.getHero().set("cunning",currentRoom.getHero().get("cunning") + CARD_MODEL_MAP.cunning.getEffectDiff(this.get(level)) )
    },
    onGain:function(){
        currentRoom.getHero().set("cunning",currentRoom.getHero().get("cunning") + CARD_MODEL_MAP.cunning.getEffect(this.get(level)) )
    },
    onExile:function(){
        currentRoom.getHero().set("cunning",currentRoom.getHero().get("cunning") - CARD_MODEL_MAP.cunning.getEffect(this.get(level)) )
    }
})
CARD_MODEL_MAP.cunning.getEffect = function(level){
    level = level || 1;
    return level+2;
}
CARD_MODEL_MAP.cunning.getEffectDiff = function(currentLevel, targetLevel){
    targetLevel = targetLevel || currentLevel+1;
    return 1;
}

CARD_MODEL_MAP.dexterity = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "dexterity",
            maxLevel: 5
        })
    },
    canLevelUp:function(){
        return CardModel.prototype.canLevelUp.call(this) && currentRoom.getHero().get("dexterity") < currentRoom.getHero().get("maxDexterity")
    },
    onLevelUp:function(){
        currentRoom.getHero().set("dexterity",currentRoom.getHero().get("dexterity") + CARD_MODEL_MAP.dexterity.getEffectDiff(this.get(level)) )
    },
    onGain:function(){
        currentRoom.getHero().set("dexterity",currentRoom.getHero().get("dexterity") + CARD_MODEL_MAP.dexterity.getEffect(this.get(level)) )
    },
    onExile:function(){
        currentRoom.getHero().set("dexterity",currentRoom.getHero().get("dexterity") - CARD_MODEL_MAP.dexterity.getEffect(this.get(level)) )
    }
})
CARD_MODEL_MAP.dexterity.getEffect = function(level){
    level = level || 1;
    return level+2;
}
CARD_MODEL_MAP.dexterity.getEffectDiff = function(currentLevel, targetLevel){
    targetLevel = targetLevel || currentLevel+1;
    return 1;
}

CARD_MODEL_MAP.dodge = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "dodge",
            maxLevel: 5
        })
    },
    canLevelUp:function(){
        return CardModel.prototype.canLevelUp.call(this) && currentRoom.getHero().get("dodge") < currentRoom.getHero().get("maxDodge")
    },
    onLevelUp:function(){
        currentRoom.getHero().set("dodge",currentRoom.getHero().get("dodge") + CARD_MODEL_MAP.dodge.getEffectDiff(this.get(level)) )
    },
    onGain:function(){
        currentRoom.getHero().set("dodge",currentRoom.getHero().get("dodge") + CARD_MODEL_MAP.dodge.getEffect(this.get(level)) )
    },
    onExile:function(){
        currentRoom.getHero().set("dodge",currentRoom.getHero().get("dodge") - CARD_MODEL_MAP.dodge.getEffect(this.get(level)) )
    }
})
CARD_MODEL_MAP.dodge.getEffect = function(level){
    level = level || 1;
    return level*2+2;
}
CARD_MODEL_MAP.dodge.getEffectDiff = function(currentLevel, targetLevel){
    targetLevel = targetLevel || currentLevel+1;
    return 2;
}

CARD_MODEL_MAP.luck = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "luck",
            maxLevel: 5
        })
    },
    canLevelUp:function(){
        return CardModel.prototype.canLevelUp.call(this) && currentRoom.getHero().get("luck") < currentRoom.getHero().get("maxLuck")
    },
    onLevelUp:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") + CARD_MODEL_MAP.luck.getEffectDiff(this.get(level)) )
    },
    onGain:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") + CARD_MODEL_MAP.luck.getEffect(this.get(level)) )
    },
    onExile:function(){
        currentRoom.getHero().set("luck",currentRoom.getHero().get("luck") - CARD_MODEL_MAP.luck.getEffect(this.get(level)) )
    }
})
CARD_MODEL_MAP.luck.getEffect = function(level){
    level = level || 1;
    return level+2;
}
CARD_MODEL_MAP.luck.getEffectDiff = function(currentLevel, targetLevel){
    targetLevel = targetLevel || currentLevel+1;
    return 1;
}

