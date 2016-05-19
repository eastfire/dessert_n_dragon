var MAX_ENEMY_LEVEL = 18;
GEN_ENEMY_STRATEGY_MAP.infinite = GenEnemyStrategy.extend({
    defaults:function(){
        return _.extend(GenEnemyStrategy.prototype.defaults.call(this),{
            enemyPoolChangePerTurn : 31,
            enemyLevelPoolChangePerTurn: 101
        })
    },
    maintain:function(roomModel){
        if ( !roomModel.get("turnNumber") ) return;
        if ( roomModel.get("turnNumber") % this.get("enemyPoolChangePerTurn") === 0 ) {
            var allEnemyPool = [];
            _.each(roomModel.get("baseEnemyPool"),function(enemy){
                allEnemyPool.push(enemy);
            },this);
            _.each(unlockedStatus.get("enemy"),function(value, key){
                allEnemyPool.push({
                    type: key
                });
            },this);
            var currentEnemyPool = roomModel.get("enemyPool");
            var availableEnemyPool = _.filter(allEnemyPool,function(enemy){
                return !_.any(currentEnemyPool, function(currentEnemy){
                    return currentEnemy.type === enemy.type;
                });
            },this);
            var newEnemy = _.sample(availableEnemyPool);
            currentEnemyPool.shift();
            currentEnemyPool.push(newEnemy);
        }
        if ( roomModel.get("turnNumber") % this.get("enemyLevelPoolChangePerTurn") === 0 ) {
            var levelPool = roomModel.get("enemyLevelPool");
            var maxLevel = _.last(levelPool);
            var newMaxLevel = Math.min(MAX_ENEMY_LEVEL , maxLevel+1)
            for ( var i = 1; i <= newMaxLevel; i++){
                levelPool.push(i);
            }
        }
    }
})

ROOM_MODEL_MAP.infinite = RoomModel.extend({

});
