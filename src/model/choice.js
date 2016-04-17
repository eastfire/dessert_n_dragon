var CHOICE_FACTORY_MAP = {
    getScore:function(roomModel, opt){
        return {
            description:"加"+opt.number+"分",
            onChosen:function(roomModel){
                roomModel.getScore(opt.number);
            }
        }
    },
    getMove:function(roomModel, opt){
        return {
            description:"加"+opt.number+"次移动",
            onChosen:function(roomModel){
                roomModel.set("turnLimit",roomModel.get("turnLimit")+opt.number);
            }
        }
    },
    getRandomMove:function(roomModel, opt){
        var number = Math.round(Math.random()*(opt.to-opt.from)+opt.from);
        return {
            description:"加"+number+"次移动",
            onChosen:function(roomModel){
                roomModel.set("turnLimit",roomModel.get("turnLimit")+number);
            }
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
            }
        }
    },
    reduceWait:function(roomModel, opt){
        return {
            description:"手中每张技能卡的等待时间减少"+opt.number,
            onChosen:function(roomModel){
                _.each(roomModel.getHand(),function(cardModel){
                    cardModel.reduceWait(opt.number)
                },this);
            }
        }
    },
    reduceRandomWait:function(roomModel, opt){
        var number = Math.round(Math.random()*(opt.to-opt.from)+opt.from);
        return {
            description:"手中每张技能卡的等待时间减少"+number,
            onChosen:function(roomModel){
                _.each(roomModel.getHand(),function(cardModel){
                    cardModel.reduceWait(number)
                },this);
            }
        }
    },
    reduceAllWait:function(roomModel, opt){
        return {
            description:"手中所有技能卡等待时间变为0",
            onChosen:function(roomModel){
                _.each(roomModel.getHand(),function(cardModel){
                    cardModel.reduceWait(1000) //FIXME just a big number here
                },this);
            }
        }
    }
};

CHOICE_VALIDATE_MAP = {
    getFullHp:function(roomModel){
        return roomModel.getHero().get("hp") < roomModel.getHero().get("maxHp")
    },
    reduceWait:function(roomModel){
        if ( roomModel.getHand().length === 0 ) return false;
        return _.any(roomModel.getHand(),function(cardModel){
           return cardModel.get("waitTurn") > 0;
        });
    },
    getMove:function(roomModel){
        var winEveryCondition = roomModel.get("winEveryConditions");
        if ( winEveryCondition && winEveryCondition.length && winEveryCondition[0] === "outOfTurn") return false
        return true;
    }
}
CHOICE_VALIDATE_MAP.reduceAllWait = CHOICE_VALIDATE_MAP.reduceRandomWait = CHOICE_VALIDATE_MAP.reduceWait;
CHOICE_VALIDATE_MAP.getRandomMove = CHOICE_VALIDATE_MAP.getMove;

var getValidChoices = function(roomModel, choicePool){
    return _.filter(choicePool,function(choiceEntry){
        return !CHOICE_VALIDATE_MAP[choiceEntry.type] || CHOICE_VALIDATE_MAP[choiceEntry.type](roomModel); //不需要validate或通过validate
    });
}

var GEN_CHOICE_STRATEGY_MAP = {
    random : function(roomModel, opt){
        var validChoices = getValidChoices(roomModel, roomModel.get("choicePool"));
        return _.sample(validChoices, roomModel.getHero().get("choiceNumber"));
    }
}
