var CHOICE_FACTORY_MAP = {
    getScore:function(roomModel, opt){
        return {
            description:"加"+opt.number+"分",
            onChosen:function(roomModel){
                roomModel.getScore(opt.number);
            },
            unlockChoice: null,
            removeChoice: null
        }
    },
    getFullHp:function(roomModel){
        return {
            description:"恢复所有生命",
            onChosen:function(roomModel){
                roomModel.getHero().set("hp", roomModel.getHero().get("maxHp"));
            },
            unlockChoice: null,
            removeChoice: null
        }
    },
    getCard:function(roomModel,opt){
        var cardModel = new CARD_MODEL_MAP[opt.type](opt);
        return {
            description:"获得技能卡："+cardModel.get("name")+"\n"+cardModel.getDescription(),
            onChosen:function(roomModel){
                roomModel.gainCard(opt);
            },
            unlockChoice: null,
            removeChoice: null
        }
    }
};


var GEN_CHOICE_STRATEGY_MAP = {
    random : function(roomModel, opt){
        return _.sample(roomModel.get("choicePool"), roomModel.getHero().get("choiceNumber"));
    }
}