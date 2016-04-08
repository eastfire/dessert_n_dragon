var CardModel = Backbone.Model.extend({
    defaults: function () {
        return {
            type: "",

            level: 1,
            waitTurn: 1,
            isShowLevel: true
        }
    },
    initialize: function () {

    },
    getName:function(){
        return texts.card[this.get("type")].name;
    },
    getDescription:function(){
        return texts.card[this.get("type")].desc;
    },
    onGain:function(){
    },
    onUse:function(){
    },
    onExile:function(){
    },
    onDraw:function(){
    },
    onDiscard:function(){
    }
});

var CardHealModel = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "heal"
        })
    }
})

var CardTailSlashModel = CardModel.extend({
    defaults: function () {
        return _.extend(CardModel.prototype.defaults.call(this),{
            type: "tail-slash"
        })
    }
})

var CARD_MODEL_MAP = {
    heal: CardHealModel,
    "tail-slash":CardTailSlashModel
}