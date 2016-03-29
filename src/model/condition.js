var CONDITION_FUN_FACTORY_MAP = {
    outOfTurn:function(roomModel){
        return function(roomModel) {
            var turnLimit = roomModel.get("turnLimit");
            if (turnLimit === 0) return false; //unlimited turn
            return roomModel.get("turnNumber") >= turnLimit;
        }
    },
    kill:function(roomModel, opt){
        return function(roomModel) {
            var statistic = roomModel.get("statistic");
            var enemyType = opt.type + ( opt.subtype ? ("_" + opt.subtype) : "");
            var statisticItem = "kill-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            return statistic[statisticItem] >= opt.number
        }
    },
    "kill-level":function(roomModel, opt){
        return function(roomModel) {
            var statistic = roomModel.get("statistic");
            var enemyType = opt.type + ( opt.subtype ? ("_" + opt.subtype) : "");
            var statisticItem = "kill-level-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            return statistic[statisticItem] >= opt.number
        }
    },
    "kill-max-level":function(roomModel, opt){
        return function(roomModel) {
            var statistic = roomModel.get("statistic");
            var enemyType = opt.type + ( opt.subtype ? ("_" + opt.subtype) : "");
            var statisticItem = "kill-max-level-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            return statistic[statisticItem] >= opt.number
        }
    },
    score:function(roomModel, opt){
        return function(roomModel) {
            return roomModel.get("score") >= opt.number;
        }
    }
};