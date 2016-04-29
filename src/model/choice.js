var CHOICE_FACTORY_MAP = {
    getScore:function(roomModel, opt){
        return {
            description:"加"+opt.number+"分",
            onChosen:function(roomModel){
                roomModel.getScore(opt.number);
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
    getRandomTime:function(roomModel, opt){
        var number = Math.round(Math.random()*(opt.to-opt.from)+opt.from);
        return {
            description:"加"+number+"秒时间",
            onChosen:function(roomModel){
                roomModel.set("timeLimit",roomModel.get("timeLimit")+number);
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
    levelUpCard:function(roomModel){
        var allCard = _.union(roomModel.getHand(),roomModel.getDeck(), roomModel.getDiscard());
        var validCards = _.filter(allCard, function(cardModel){
            return cardModel.canLevelUp()
        })
        var levelUpCard = _.sample(validCards);
        var type = levelUpCard.get("type")
        var targetLevel = levelUpCard.get("level")+1
        return {
            description:"将"+getCardName(type)+"升级到"+targetLevel+"级\n"+getCardLevelUpDesc( type, targetLevel),
            onChosen:function(roomModel){
                levelUpCard.levelUp(1);
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
    reduceRandomWait:function(roomModel){
        if ( roomModel.getHand().length === 0 ) return false;
        return _.any(roomModel.getHand(),function(cardModel){
           return cardModel.get("waitTurn") > 0;
        });
    },
    getRandomMove:function(roomModel){
        var loseAnyConditions = roomModel.get("loseAnyConditions");
        if ( loseAnyConditions && loseAnyConditions.length && loseAnyConditions[0] === "outOfTurn") return true
        return false;
    },
    getRandomTime:function(roomModel){
        var loseAnyConditions = roomModel.get("loseAnyConditions");
        if ( loseAnyConditions && loseAnyConditions.length && loseAnyConditions[0] === "outOfTime") return true
        return false;
    },
    getCard:function(roomModel, choiceEntry){
        var opt = choiceEntry.opt || {};
        if ( !opt.maxCount ) return true;
        var allCard = _.union(roomModel.getHand(),roomModel.getDeck(), roomModel.getDiscard());
        var thisTypeCards = _.filter(allCard,function(cardModel){
            return cardModel.get("type") === opt.type;
        })
        return thisTypeCards.length < opt.maxCount;
    },
    levelUpCard:function(roomModel){
        var allCard = _.union(roomModel.getHand(),roomModel.getDeck(), roomModel.getDiscard());
        var validCards = _.filter(allCard, function(cardModel){
            return cardModel.canLevelUp()
        })
        return validCards.length;
    }
}
CHOICE_VALIDATE_MAP.reduceAllWait = CHOICE_VALIDATE_MAP.reduceRandomWait;

var getValidChoices = function(roomModel, choicePool){
    return _.filter(choicePool,function(choiceEntry){
        return !CHOICE_VALIDATE_MAP[choiceEntry.type] || CHOICE_VALIDATE_MAP[choiceEntry.type](roomModel, choiceEntry); //不需要validate或通过validate
    });
}

var GEN_CHOICE_STRATEGY_MAP = {
    random: function(roomModel, opt){
        var unlockedChoices = _.map( unlockedStatus.get("card"), function( value, key ) {
            return {
                type:"getCard",
                opt:{
                    type:key,
                    maxCount:5
                }
            }
        },this);
        var allChoices = _.union(roomModel.get("choicePool"), unlockedChoices );
        var validChoices = getValidChoices(roomModel, allChoices);
        return _.sample(validChoices, roomModel.getHero().get("choiceNumber"));
    }
}
