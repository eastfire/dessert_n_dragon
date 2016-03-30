var RoomTileModel = Backbone.Model.extend({
    defaults:function(){
        return {
            type: "",
            subtype: null,
            x: 0,
            y: 0,
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

var RoomWallTileModel = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "wall",
            subtype:"up",
            isPassable: false,
            canGenEnemy: false
        });
    }
})

var FloorTileModel = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "floor",
            subtype: "normal"
        });
    }
})

var PillarTileModel = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "pillar",
            subtype: "normal",
            isPassable: false,
            canGenEnemy: false
        });
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

var TILE_MODEL_MAP = {
    "wall": RoomWallTileModel,
    "floor":FloorTileModel,
    "pillar":PillarTileModel
}