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
            subtype:"s",
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
        RoomTileModel.prototype.onTurnStart.call(this);
        //if has movable
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel && movableModel.isSinglePiece() &&
            movableModel.__teleportTurn !== currentRoom.get("turnNumber") && //防止反复传送
            movableModel.isSinglePiece() ) {
            //find another same subtype
            var tiles = currentRoom.filterTile(function(tileModel){
                return tileModel !== this && tileModel.get("type") === this.get("type") &&
                tileModel.get("subtype") === this.get("subtype");
            },this);
            if (tiles.length===1){
                var targetMovable = currentRoom.getMovableByTile(tiles[0]);
                if ( !targetMovable ) { //target portal is empty
                    cc.log("teleport"+movableModel.get("type"))
                    movableModel.__teleportTurn = currentRoom.get("turnNumber"); //防止反复传送
                    movableModel.teleport(tiles[0].get("position"), true);
                }
            } else {
                cc.error("stage error! portal not appear in pair.")
            }
        }
    }
})

TILE_MODEL_MAP["room-portal"] = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "room-portal",
            subtype: "normal",
            isCapture: true,
            canGenEnemy: false
        });
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel && movableModel instanceof HeroModel ){
            currentRoom.trigger("before-switch-room");
            return true;
        }
        return false;
    }
})

TILE_MODEL_MAP["wall-door"] = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "wall-door",
            subtype: "cs",
            isCapture: true,
            canGenEnemy: false
        });
    },
    isPassable:function(){
        return this.get("subtype").startsWith("o");
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel && movableModel instanceof HeroModel ){
            currentRoom.trigger("to-next-room", this.get("position"));
            return true;
        }
        return false;
    },
    open:function(){
        //TODO
        this.set("subtype", this.get("subtype").chop());
    },
    close:function(){
        //TODO
        this.set("subtype", "close");
    }
})

TILE_MODEL_MAP.pit = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "pit",
            subtype: "normal",
            isCapture: true
        });
    }
})

TILE_MODEL_MAP.nail = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "nail",
            subtype: "normal"
        });
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel ){
            if ( movableModel instanceof HeroModel ) {
                this.trigger("attacking",this);
                currentRoom.getHero().loseHp(this.getEffect(), {
                    category:"tile",
                    type:this.get("type"),
                    subtype:this.get("subtype")
                });
            }
        }
    },
    getEffect:function(){
        return 5;
    }
})

var BELT_DIRECTION_MAP = {
    n: DIRECTION_UP,
    en: DIRECTION_UP,
    wn: DIRECTION_UP,
    s: DIRECTION_DOWN,
    es: DIRECTION_DOWN,
    ws: DIRECTION_DOWN,
    e: DIRECTION_RIGHT,
    ne: DIRECTION_RIGHT,
    se: DIRECTION_RIGHT,
    w: DIRECTION_LEFT,
    nw: DIRECTION_LEFT,
    sw: DIRECTION_LEFT
}

TILE_MODEL_MAP.belt = RoomTileModel.extend({
    defaults:function(){
        return _.extend(RoomTileModel.prototype.defaults.apply(this),{
            type: "belt",
            subtype: "n"
        });
    },
    onTurnStart:function(){
        RoomTileModel.prototype.onTurnStart.call(this);
        
        var movableModel = currentRoom.getMovableByTile(this);
        if ( movableModel && movableModel.isSinglePiece() && movableModel.__beltTurn !== currentRoom.get("turnNumber") ){
            if ( this.checkCanMoveToNext(this) ) {
                movableModel.__beltTurn = currentRoom.get("turnNumber");
                var direction = BELT_DIRECTION_MAP[this.get("subtype")];
                movableModel.beltTo(getIncrementPosition(this.get("position"), direction))
            }
        }
    },
    checkCanMoveToNext:function(tileModel){
        //already calculated
        if ( tileModel.__beltTurn === currentRoom.get("turnNumber")) {
            return tileModel.__beltCanMoveToNext;
        }
        
        var direction = BELT_DIRECTION_MAP[tileModel.get("subtype")];
        var nextTile = currentRoom.getTile(getIncrementPosition(tileModel.get("position"), direction));
        if ( !nextTile || !nextTile.isPassable() ) {
            tileModel.__beltTurn = currentRoom.get("turnNumber");
            tileModel.__beltCanMoveToNext = false;
            return false;
        }
        
        var nextMovableModel = currentRoom.getMovableByTile(nextTile);
        if ( nextMovableModel ){ //has movable in nextTile
            if ( nextTile instanceof TILE_MODEL_MAP.belt ) {
                if ( this === nextTile ) { //cycled back
                    tileModel.__beltTurn = currentRoom.get("turnNumber");
                    tileModel.__beltCanMoveToNext = true;
                    return true;
                } else {
                    var result = this.checkCanMoveToNext(nextTile);
                    tileModel.__beltTurn = currentRoom.get("turnNumber");
                    tileModel.__beltCanMoveToNext = result;
                    return result;
                }
            } else {
                tileModel.__beltTurn = currentRoom.get("turnNumber");
                tileModel.__beltCanMoveToNext = false;
                return false;
            }
        } else { //empty
            tileModel.__beltTurn = currentRoom.get("turnNumber");
            tileModel.__beltCanMoveToNext = true;
            return true;
        }
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

