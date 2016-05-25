var PERK_MAP = {};

var hookManager = new Backbone.Model();

//advantage
PERK_MAP.addHalfHp = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT*1.5;
    },
    destroy:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.addHalfHp.value = -3;

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
PERK_MAP.moreChoice.value = -2;

//disadvantage
PERK_MAP.remove10InitHp = Backbone.Model.extend({
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
PERK_MAP.remove10InitHp.value = 1;

PERK_MAP.removeHalfHp = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT*0.5;
    },
    destroy:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;
        Backbone.Model.prototype.destroy.call(this)
    }
})
PERK_MAP.removeHalfHp.value = 3;

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
PERK_MAP.lessChoice.value = 2;
