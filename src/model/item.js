var ORIGIN_ITEM_LEVEL_ADJUST = 0;
var ITEM_LEVEL_ADJUST = ORIGIN_ITEM_LEVEL_ADJUST;

var ItemModel = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            canMergeTo: ["normalHero"],
            score: SCORE_INFLATION_RATE,
            isAllFaceSame: true
        } )
    },
    scoreOfLevel:function(l){
        return (l+1)*l/2*SCORE_INFLATION_RATE
    },
    initialize:function(){
        MovableModel.prototype.initialize.call(this);
        this.__isTaken = false;
        this.onLevelChange();
        this.on("change:level", this.onLevelChange,this)
    },
    onLevelChange:function(){
        var l = this.get("level");
        this.set("score", this.scoreOfLevel(l) );
    },
    taken:function(){
        currentRoom.getScore(this.get("score"));
        this.onTaken();
    },
    onTaken:function(){
    }
});

MOVABLE_MODEL_MAP.potion = ItemModel.extend({
    defaults:function(){
        return _.extend( ItemModel.prototype.defaults.call(this),{
            type: "potion"
        } )
    },
    onTaken:function(){
        currentRoom.getHero().gainHp(this.getEffect()+currentRoom.getHero().get("collector"));
    },
    getEffect:function(l){
        l = l || this.get("level");
        return (l+1)*l/2*5;
    }
})

MOVABLE_MODEL_MAP.money = ItemModel.extend({
    defaults:function(){
        return _.extend( ItemModel.prototype.defaults.call(this),{
            type: "money"
        } )
    },
    onTaken:function(){
        gameStatus.gainMoney(this.getEffect()+currentRoom.getHero().get("collector"));
    },
    getEffect:function(l){
        l = l || this.get("level");
        return (l+1)*l/2*5;
    }
})

MOVABLE_MODEL_MAP["poison-potion"] = ItemModel.extend({
    defaults:function(){
        return _.extend( ItemModel.prototype.defaults.call(this),{
            type: "potion"
        } )
    },
    onTaken:function(){
        currentRoom.getHero().loseHp(this.getEffect()+currentRoom.getHero().get("collector"),{
            category:"item",
            type:"poison-potion"
        });
    },
    getEffect:function(l){
        l = l || this.get("level");
        return 5;
    }
})