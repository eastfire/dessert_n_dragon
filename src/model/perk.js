var PERK_MAP = {};

var hookManager = new Backbone.Model();

var PERK_LIST = ["halfHpMore", "moreChoice", "draw2",
    "halfHpLess","halfInitHp","lessChoice"];
//advantage
PERK_MAP.halfHpMore = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT+ORIGIN_CONSTITUTION_EFFECT*0.5; //in case halfHpMore and halfHpLess are both picked
    },
    destroy:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.halfHpMore.value = 3;

PERK_MAP.moreChoice = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.room.getHero()
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
        var hero = currentRoom.room.getHero()
        hero.set("drawEachTurn", 2);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.draw2.value = 2;

//disadvantage
PERK_MAP.halfInitHp = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.room.getHero()
        hero.set("hp",Math.max(1,Math.round(hero.get("hp")/2)))
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.halfInitHp.value = -1;

PERK_MAP.halfHpLess = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = CONSTITUTION_EFFECT-ORIGIN_CONSTITUTION_EFFECT*0.5; //in case halfHpMore and halfHpLess are both picked
    },
    destroy:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.halfHpLess.value = -3;

PERK_MAP.lessChoice = Backbone.Model.extend({
    initialize:function(){
        hookManager.on("before-game-start",this.effect, this)
    },
    effect:function(params, extraParams){
        var hero = currentRoom.room.getHero()
        hero.set("choiceNumber", ORIGIN_CHOICE_NUMBER-1);
    },
    destroy:function(){
        hookManager.off("before-game-start",this.effect, this)
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.lessChoice.value = -2;
