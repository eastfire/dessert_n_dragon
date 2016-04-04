var CARD_NAME_MAP = {
    heal:"治疗",
    "tail-slash":"扫尾"
};

var CardModel = Backbone.Model.extend({
    defaults: function () {
        return {
            type: "",
            subtype: null,

            level: 1,

            isShowLevel: true
        }
    },
    initialize: function () {
        this.set("name", CARD_NAME_MAP[this.get("type")] )
    },
    getDescription:function(){

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

var CARD_MODEL_MAP = {

}