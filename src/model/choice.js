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
    getMove:function(roomModel, opt){
        return {
            description:"加"+opt.number+"次移动",
            onChosen:function(roomModel){
                roomModel.set("turnLimit",roomModel.get("turnLimit")+opt.number);
            },
            unlockChoice: null,
            removeChoice: null
        }
    },
    getRandomMove:function(roomModel, opt){
        var number = Math.round(Math.random()*(opt.to-opt.from)+opt.from);
        return {
            description:"加"+number+"次移动",
            onChosen:function(roomModel){
                roomModel.set("turnLimit",roomModel.get("turnLimit")+number);
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
        return {
            description:"获得技能卡："+getCardName(opt.type)+"\n"+getCardDesc(opt.type, opt.level || 1),
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
