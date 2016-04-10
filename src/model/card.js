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
            waitTurn: 1,
            isShowLevel: true,
            isShowWait: true
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
    canUse:function(){
        return true
    },
    onGain:function(){
    },
    use:function(){
        currentRoom.__acceptInput = false;
        currentRoom.gainWait(this.getWait());
        this.onUse();
        this.trigger("use",this);
        currentRoom.discardCard(this);
    },
    onUse:function(){
    },
    afterUse:function(){ // call by view
        currentRoom.__acceptInput = true;
    },
    onExile:function(){
    },
    onDraw:function(){
    },
    discard:function(){
        this.onDiscard();
        this.trigger("discard", this);
    },
    onDiscard:function(){
    },
    restoreToOrigin:function(){
        //TODO restore status that car buff or debuff
    }
});

var CardHealModel = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "heal"
        })
    },
    onUse:function(){
        currentRoom.getHero().gainHp(this.getEffect())
    },
    getEffect:function(){
        var l = this.get("level");
        return l * ( l + 1 ) / 2;
    }
})

var CardTailSlashModel = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "tail-slash"
        })
    },
    onUse:function(){
        currentRoom.getHero().gainHp(this.getEffect())
    }
})

var CARD_MODEL_MAP = {
    heal: CardHealModel,
    "tail-slash":CardTailSlashModel
}