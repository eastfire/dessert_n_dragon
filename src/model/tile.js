var RoomTileModel = Backbone.Model.extend({
    defaults:function(){
        return {
            type: "",
            subtype: null,
            isPassable: true,
            isCapture: false,
            canGenEnemy: true,
            cloud: 0,
            position:{
                x:0,
                y:0
            }
        }
    },
    isPassable:function(movable){
        return this.get("isPassable");
    },
    isCapture:function(movable){
        return this.get("isCapture");
    },
    onTurnStart:function(){
        //maintain
        this.set("cloud",Math.max(0, this.get("cloud") - 1));
    }
})

var TILE_MODEL_MAP = {}

TILE_MODEL_MAP.wall = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "wall",
            subtype:"up",
            isPassable: false,
            canGenEnemy: false
        });
    }
})

TILE_MODEL_MAP.floor = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "floor",
            subtype: "normal"
        });
    }
})

TILE_MODEL_MAP.pillar = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "pillar",
            subtype: "normal",
            isPassable: false,
            canGenEnemy: false
        });
    }
})

TILE_MODEL_MAP.portal = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "portal",
            subtype: "a",
            canGenEnemy: false
        });
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        //if has enemy
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel && 
            movableModel.__teleportTurn !== currentRoom.get("turnNumber") && //防止反复传送
            ( movableModel instanceof HeroModel || ( movableModel instanceof EnemyModel && movableModel.get("positions").length === 1 ) ) ) {
            //find another same subtype
            var tiles = currentRoom.filterTile(function(tileModel){
                return tileModel !== this && tileModel.get("type") === this.get("type") &&
                tileModel.get("subtype") === this.get("subtype");
            },this);
            if (tiles.length===1){
                var targetMovable = currentRoom.getMovableByTile(tiles[0]);
                if ( !targetMovable ) { //target portal is empty
                    movableModel.__teleportTurn = currentRoom.get("turnNumber"); //防止反复传送
                    movableModel.teleport(tiles[0].get("positions")[0]);
                }
            } else {
                cc.error("stage error! portal not appear in pair.")
            }
        }
    }
})

TILE_MODEL_MAP.pitfall = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "pitfall",
            isCapture: true,
            canGenEnemy: true
        });
    }
})

TILE_MODEL_MAP.nail = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "nail",
            isCapture: false,
            canGenEnemy: true
        });
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel ){
            if ( movableModel instanceof HeroModel ) {
                HeroModel.loseHp(this.getEffect(), this);
            }
        }
    },
    getEffect:function(){
        return 5;
    }
})

var DoorTileModel = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "door",
            isCapture: true,
            canGenEnemy: false
        });
    }
})

