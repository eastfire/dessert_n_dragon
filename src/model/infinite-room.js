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
        if ( (14+roomModel.get("turnNumber")) % this.get("enemyPoolChangePerTurn") === 0 ) {
            var allEnemyPool = [];
            _.each(roomModel.get("baseEnemyPool"),function(enemy){
                allEnemyPool.push(enemy);
            },this);
//            _.each(unlockedStatus.get("enemy"),function(value, key){
//                allEnemyPool.push({
//                    type: key
//                });
//            },this);
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
            for ( var i = Math.max(1,newMaxLevel-3); i <= newMaxLevel; i++){
                levelPool.push(i);
            }
            var firstLevel = levelPool[0];
            if ( newMaxLevel - firstLevel >= 4 ) {
                //remove all firstLevel
                roomModel.set("enemyLevelPool", _.reject(levelPool,function(level){
                   return level === firstLevel;
                },this));
            }
        }
    }
})

ROOM_MODEL_MAP.infinite = RoomModel.extend({
    defaults:function(){
        return _.extend(RoomModel.prototype.defaults.call(this),{
            type : "infinite"
        })
    },
    switchRoom:function(){
        this.foreachTile(function(tileModel){
            tileModel.destroy();
        },this)
        this.foreachMovable(function(movableModel){
            if (!( movableModel instanceof HeroModel ))
                movableModel.destroy();
        });

        var randomRoomEntry = _.sample(_.filter(rooms,function(entry){
            return !entry.notForInfinity;
        }))
        this.set("exits",clone(randomRoomEntry.exits));
        this.set("initTiles", clone(randomRoomEntry.initTiles) );
        this.initTiles();

        this.set("initMovables", randomRoomEntry.initMovables);
        this.initMovables();
        this.__movables.push(this.__hero);
        this.__hero.set("positions", clone(randomRoomEntry.initHero.positions));
        this.__hero.calculateEdgePositions();

        this.__genMovableMap();

        hookManager.trigger("after-pass-room");
        this.trigger("switch-room",this);
    },
    initialize:function(){
        if ( this.get("turnNumber") === 0 && !this.get("roomInitialized")) {
            var randomRoomEntry = _.sample(_.filter(rooms,function(entry){
                return !entry.notForInfinity && !entry.notForInfiniteStart;
            }))
            this.set("exits",clone(randomRoomEntry.exits));
            this.set("initTiles", clone(randomRoomEntry.initTiles) );
            this.get("initHero").positions = clone(randomRoomEntry.initHero.positions);
            this.set("roomInitialized",true);
        }
        RoomModel.prototype.initialize.call(this);
    },
    turnEnd:function(){
        if ( (this.get("turnNumber")+30) % 73 === 0 ) {
            var exits = _.sample(this.get("exits"), Math.round(Math.random()*this.get("exits").length)+1);
            _.each(exits,function(position){
                var tileModel = this.getTile(position)
                var newTileModel = new TILE_MODEL_MAP["room-portal"]({
                    position:position
                });
                tileModel.trigger("changeModel", newTileModel );
                this.__tiles[position.x][position.y] = newTileModel;
            },this)
        }
        RoomModel.prototype.turnEnd.call(this)
    }
});
