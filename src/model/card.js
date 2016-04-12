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
            waitTurn: 1,
            isShowLevel: true,
            isShowWait: true
        }
    },
    initialize: function () {
        this.set("waitTurn",this.waitTurnOfLevel(this.get("level")));
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
        currentRoom.blockInput();
        currentRoom.gainWait(this.getWait());
        this.onUse();
        this.trigger("use",this);
        currentRoom.discardCard(this);
    },
    onUse:function(){
    },
    afterUse:function(){ // call by view
        currentRoom.unblockInput();
        currentRoom.getHero().checkLevelUp(); //maybe level up after use card
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
        //TODO restore status that card buff or debuff
    },
    waitTurnOfLevel:function(level){
        return 0;
    }
});

var CardHealModel = CardModel.extend({
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
        var l = this.get("level");
        return l;
    }
})

var CardTailSlashModel = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "tail-slash",
            maxLevel: 4
        })
    },
    waitTurnOfLevel:function(level){
        return 5-level;
    },
    onUse:function(){

    }
})

var CARD_MODEL_MAP = {
    heal: CardHealModel,
    "tail-slash":CardTailSlashModel
}