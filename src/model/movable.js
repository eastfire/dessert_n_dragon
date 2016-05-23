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

            isShowLevel: true,

            //status
            frozen: 0,
            angry: 0
        }
    },
    initialize:function(){
        this.set("generateOver",true)
        this.calculateEdgePositions();
    },
    getSize:function(){
        return this.get("positions").length;
    },
    isSinglePiece:function(){
        return this.get("positions").length === 1;
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
        return this.get("isMovable") && !this.get("frozen");
    },
    canBeMergedBy:function(movable, direction){
        if ( this.get("isMergeToSelfType")
            && movable.get("type") === this.get("type")
            && movable.get("subtype") === this.get("subtype")) {
            return true;
        }

        if (_.contains(movable.get("canMergeTo"), this.get("type"))) return true;
        return false;
    },
    canMergeTo:function(movable, direction){
        if (_.contains(this.get("canMergeTo"), movable.get("type"))) return true;
//        if (_.contains(movable.get("canMergeTo"), this.get("type"))) return true;
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
        cc.log("generate")
        this.set("generateOver",false);
        this.trigger("generate",this)
    },
    afterGenerate:function(){ //called by view
        cc.log("afterGenerate")
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
        this.__removeOldMapping();

        this.trigger("move",this, opt)
    },
    __removeOldMapping:function(){
        _.each(this.get("positions"), function (position) {
            currentRoom.__movableMap[position.x][position.y] = null;
        }, this)
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
        //TODO keep status after merge
        this.set({
            angry: this.get("angry") || movable.get("angry"),
            frozen: this.get("frozen") || movable.get("frozen")
        })

        this.levelUp(movable.get("level"));
    },
    afterAllMove:function(){
    },
    beforeLevelUp:function(level){
    },
    levelUp:function(level){
        this.beforeLevelUp(this.get("level"));
        this.set("level",this.get("level")+level)
        this.trigger("levelUp",this, this.get("level"))
    },
    afterLevelUp:function(level){ //called by view
    },
    onTurnStart:function(){
        //maintain
        this.set({
            frozen: Math.max(0, this.get("frozen") - 1 )
        })
    },
    onTurnEnd:function(){
    },
    getFrozen:function(amount){
        this.set("frozen",amount);
    },
    getAngry:function(amount){
        this.set("angry",amount);
    },
    setNewPosition:function(newPosition){
        var oldPosition = this.get("positions")[0];
        var diffX = newPosition.x - oldPosition.x;
        var diffY = newPosition.y - oldPosition.y;
        _.each(this.get("positions"),function(position){
            position.x += diffX;
            position.y += diffY;
            currentRoom.__movableMap[position.x][position.y] = this;
        },this);
        this.calculateEdgePositions();
    },
    teleport:function(newPosition, isTurnStart){
        this.trigger("teleport", newPosition);
        if ( isTurnStart ) {
            this.__changePositionAtTurnStart = currentRoom.get("turnNumber");
            this.__newPositionAtTurnStart = newPosition;
        } else {
            this.__removeOldMapping();
            this.setNewPosition(newPosition);
        }
    },
    afterTeleport:function(){
    },
    afterHeroTeleport:function(){
    },
    beltTo:function(newPosition){
        this.trigger("beltTo", newPosition);
        this.__changePositionAtTurnStart = currentRoom.get("turnNumber");
        this.__newPositionAtTurnStart = newPosition;
    },
    afterBeltTo:function(newPosition){
    },
    afterTurnStartStep1:function(){
        if ( this.__changePositionAtTurnStart === currentRoom.get("turnNumber") ) {
            this.__removeOldMapping();
        }
    },
    afterTurnStartStep2:function(){
        if ( this.__changePositionAtTurnStart === currentRoom.get("turnNumber") ) {
            this.setNewPosition(this.__newPositionAtTurnStart);
        }
    },
    afterTurnStartStep3:function(){
    }
})

var MOVABLE_MODEL_MAP = {}
