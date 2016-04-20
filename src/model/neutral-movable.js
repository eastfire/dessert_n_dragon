var NeutralMovable = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            isAllFaceSame: true
        } )
    }
});

var PillarModel = NeutralMovable.extend({
    defaults:function(){
        return _.extend( NeutralMovable.prototype.defaults.call(this),{
            type: "pillar",
            isMovable: false,
            isShowLevel: false
        } )
    }
})
MOVABLE_MODEL_MAP.pillar = PillarModel;

var VerticalLog2Model = NeutralMovable.extend({
    defaults:function(){
        return _.extend( NeutralMovable.prototype.defaults.call(this),{
            type: "vertical-log2",
            isShowLevel: false
        } )
    },
    isMovable:function(direction){
        return this.get("isMovable") && !this.get("frozen") && (direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT);
    }
})
MOVABLE_MODEL_MAP["vertical-log2"] = VerticalLog2Model;