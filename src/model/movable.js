var MovableModel = Backbone.Model.extend({
    defaults:function(){
        return {
            type: "",
            subtype: null,
            isMovable: true,
            isMergeToSelfType: true,

            canMergeTo: [],
            positions:[{
                x: 0,
                y: 0
            }
            ],
            face: DIRECTION_DOWN,
            level: 1,

            isShowLevel: true
        }
    },
    initialize:function(){
        this.set("generateOver",true)
        this.calculateEdgePositions();
    },
    isSinglePiece:function(){
        return this.get("positions").length > 1;
    },
    calculateEdgePositions:function(){
        this.edgePositions = [[],[],[],[]];
        _.each(this.get("positions"),function(position){
            if ( ( this.edgePositions[DIRECTION_UP][position.x] === undefined ) ||
                ( this.edgePositions[DIRECTION_UP][position.x].y < position.y ) ) {
                this.edgePositions[DIRECTION_UP][position.x] = position
            }
            if ( ( this.edgePositions[DIRECTION_DOWN][position.x] === undefined ) ||
                ( this.edgePositions[DIRECTION_DOWN][position.x].y > position.y ) ) {
                this.edgePositions[DIRECTION_DOWN][position.x] = position
            }
            if ( ( this.edgePositions[DIRECTION_RIGHT][position.y] === undefined ) ||
                ( this.edgePositions[DIRECTION_RIGHT][position.y].x < position.x ) ) {
                this.edgePositions[DIRECTION_RIGHT][position.y] = position
            }
            if ( ( this.edgePositions[DIRECTION_LEFT][position.y] === undefined ) ||
                ( this.edgePositions[DIRECTION_LEFT][position.y].x > position.x ) ) {
                this.edgePositions[DIRECTION_LEFT][position.y] = position
            }
        },this )
        this.edgePositionLength = [];
        _.each(DIRECTIONS,function(direction){
            this.edgePositionLength[direction] = _.filter(this.edgePositions[direction], function(p){
                return p;
            },this).length;
        },this)
    },
    isMovable:function(direction){
        return this.get("isMovable")
    },
    canBeMergedBy:function(movable, direction){
        if ( this.get("isMergeToSelfType")
            && movable.get("type") === this.get("type")
            && movable.get("subtype") === this.get("subtype")) {
            return true;
        }
        if (_.contains(this.get("canMergeTo"), movable.get("type"))) return true;
        if (_.contains(movable.get("canMergeTo"), this.get("type"))) return true;
        return false;
    },
    canMergeTo:function(movable, direction){
        if (_.contains(movable.get("canMergeTo"), this.get("type"))) return true;
    },
    getEdgePositionLength:function(direction){
        return this.edgePositionLength[direction]
    },
    isEdgePosition:function(direction,x,y){
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        return _.some(this.edgePositions[direction],function(position){
            return position && position.x === x && position.y === y;
        })
    },
    isMyPosition:function(x,y){
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        return _.some(this.get("positions"),function(position){
            return position.x === x && position.y === y;
        })
    },
    generate:function(){
        this.set("generateOver",false);
        this.trigger("generate",this)
    },
    afterGenerate:function(){ //called by view
        this.set("generateOver",true)
        currentRoom.checkAllMovableGenerated();
    },
    beforeMove:function(opt){
    },
    move:function(opt){
        this.set({
            face: opt.direction
        })
        this.beforeMove( opt );
        //remove old mapping
        _.each(this.get("positions"), function (position) {
            currentRoom.__movableMap[position.x][position.y] = null;
        }, this)

        this.trigger("move",this, opt)
    },
    faceTo:function(direction){
        this.set({
            face: direction
        })
    },
    afterMove:function(opt){ //called by view
        var direction = opt.direction;
        var step = opt.step;
        var currentX = this.get("positions")[0].x + step*INCREMENTS[direction].x
        var currentY = this.get("positions")[0].y + step*INCREMENTS[direction].y
        if ( opt.result === SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
            var movable = currentRoom.getMovableByPosition(currentX, currentY);
            this.mergeTo(movable);
        } else if ( opt.result === SHIFT_RESULT_MERGE_AND_STAY ) {
            var movable = currentRoom.getMovableByPosition(currentX, currentY);
            movable.mergeTo(this);
        }
        if ( opt.result !== SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
            _.each(this.get("positions"),function(position){
                position.x += step*INCREMENTS[direction].x;
                position.y += step*INCREMENTS[direction].y;
                currentRoom.__movableMap[position.x][position.y] = this;
            },this);
            this.calculateEdgePositions();
        }
    },
    beforeMergeTo:function(movable){
    },
    mergeTo:function(movable){ //合并到目标movable中，自身消失
        this.beforeMergeTo(movable);
        movable.beforeBeMerged(this);
        this.trigger("mergeTo",this, movable)
        movable.trigger("beMerged",movable, this)

    },
    afterMergeTo:function(targetMovable){ //called by view
        targetMovable.afterBeMerged(this);
        currentRoom.removeMovable(this);
    },
    beforeBeMerged:function(movable){
    },
    afterBeMerged:function(movable){
        this.set("level",this.get("level")+movable.get("level"))
        this.levelUp(this.get("level"));
    },
    beforeLevelUp:function(level){
    },
    levelUp:function(level){
        this.beforeLevelUp(level);
        this.trigger("levelUp",this, level)
    },
    afterLevelUp:function(level){ //called by view
    },
    onTurnStart:function(){
    },
    onTurnEnd:function(){
    }
})

var MOVABLE_MODEL_MAP = {}