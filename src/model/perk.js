var PERK_MAP = {};

var hookManager = new Backbone.Model();

var PERK_LIST = ["halfHpMore", "moreChoice", "draw2","moreExpAbove12","forwardAfterKill","moreMaxLevel","passRoomRecovery","moreItemLevel","lessNegativeTime","lessCardWait",
    "halfHpLess","initHp5","lessChoice","lessExpBelow6","lessMaxLevel","lessItemLevel","moreNegativeTime","moreCardWait"];
//advantage
PERK_MAP.halfHpMore = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT+ORIGIN_CONSTITUTION_EFFECT*0.5; //in case halfHpMore and halfHpLess are both picked
    },
    destroy:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT-ORIGIN_CONSTITUTION_EFFECT*0.5;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.halfHpMore.value = 3;

PERK_MAP.moreChoice = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.set("choiceNumber", ORIGIN_CHOICE_NUMBER+1);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreChoice.value = 2;

PERK_MAP.draw2 = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.set("drawEachTurn", 2);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.draw2.value = 2;

PERK_MAP.moreMaxLevel = Backbone.Model.extend({
    initialize:function(){
        CARD_LEVEL_ADJUST = CARD_LEVEL_ADJUST+1;
    },
    destroy:function(){
        CARD_LEVEL_ADJUST = CARD_LEVEL_ADJUST-1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreMaxLevel.value = 1;

PERK_MAP.passRoomRecovery = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("after-pass-room",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.gainHp(hero.get("maxHp")-hero.get("hp"))
    },
    destroy:function(){
        hookManager.off("after-pass-room",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.passRoomRecovery.value = 2;

PERK_MAP.moreItemLevel = Backbone.Model.extend({
    initialize:function(){
        ITEM_LEVEL_ADJUST = ITEM_LEVEL_ADJUST+1;
    },
    destroy:function(){
        ITEM_LEVEL_ADJUST = ITEM_LEVEL_ADJUST-1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreItemLevel.value = 2;

PERK_MAP.lessNegativeTime = Backbone.Model.extend({
    initialize:function(){
        NEGATIVE_EFFECT_TIME_ADJUST = NEGATIVE_EFFECT_TIME_ADJUST-1;
    },
    destroy:function(){
        NEGATIVE_EFFECT_TIME_ADJUST = NEGATIVE_EFFECT_TIME_ADJUST+1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessNegativeTime.value = 2;

PERK_MAP.lessCardWait = Backbone.Model.extend({
    initialize:function(){
        CARD_WAIT_ADJUST = CARD_WAIT_ADJUST-1;
    },
    destroy:function(){
        CARD_WAIT_ADJUST = CARD_WAIT_ADJUST+1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessCardWait.value = 1;

PERK_MAP.moreExpAbove12 = Backbone.Model.extend({
    initialize:function(){
        MORE_EXP_ABOVE12 = true;
    },
    destroy:function(){
        MORE_EXP_ABOVE12 = false;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreExpAbove12.value = 2;

PERK_MAP.forwardAfterKill = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.set("forwardAfterKillEnemy", true);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.forwardAfterKill.value = 2;


//disadvantage
PERK_MAP.initHp5 = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.set("hp",5)
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.initHp5.value = -1;

PERK_MAP.halfHpLess = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT-ORIGIN_CONSTITUTION_EFFECT*0.5; //in case halfHpMore and halfHpLess are both picked
    },
    destroy:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT+ORIGIN_CONSTITUTION_EFFECT*0.5;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.halfHpLess.value = -3;

PERK_MAP.lessChoice = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.getHero()
        hero.set("choiceNumber", ORIGIN_CHOICE_NUMBER-1);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessChoice.value = -2;

PERK_MAP.lessMaxLevel = Backbone.Model.extend({
    initialize:function(){
        CARD_LEVEL_ADJUST = CARD_LEVEL_ADJUST-1;
    },
    destroy:function(){
        CARD_LEVEL_ADJUST = CARD_LEVEL_ADJUST+1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessMaxLevel.value = -1;

PERK_MAP.lessItemLevel = Backbone.Model.extend({
    initialize:function(){
        ITEM_LEVEL_ADJUST = ITEM_LEVEL_ADJUST-1;
    },
    destroy:function(){
        ITEM_LEVEL_ADJUST = ITEM_LEVEL_ADJUST+1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessItemLevel.value = -2;

PERK_MAP.moreNegativeTime = Backbone.Model.extend({
    initialize:function(){
        NEGATIVE_EFFECT_TIME_ADJUST = NEGATIVE_EFFECT_TIME_ADJUST+1;
    },
    destroy:function(){
        NEGATIVE_EFFECT_TIME_ADJUST = NEGATIVE_EFFECT_TIME_ADJUST-1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreNegativeTime.value = -2;

PERK_MAP.moreCardWait = Backbone.Model.extend({
    initialize:function(){
        CARD_WAIT_ADJUST = CARD_WAIT_ADJUST+1;
    },
    destroy:function(){
        CARD_WAIT_ADJUST = CARD_WAIT_ADJUST-1;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.moreCardWait.value = -1;

PERK_MAP.lessExpBelow6 = Backbone.Model.extend({
    initialize:function(){
        LESS_EXP_BELOW6 = true;
    },
    destroy:function(){
        LESS_EXP_BELOW6 = false;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessExpBelow6.value = -2;

