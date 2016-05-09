var RoomTileModel = Backbone.Model.extend({
    defaults:function(){
        return {
            type: "",
            subtype: null,
            isPassable: true,
            isCapture: false,
            canGenEnemy: true,
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
            subtype: "a"
        });
    },
    onTurnStart:function(){

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

