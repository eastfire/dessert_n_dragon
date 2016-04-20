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
        return NeutralMovable.prototype.isMovable.call(this,direction) && (direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT);
    }
})
MOVABLE_MODEL_MAP["vertical-log2"] = VerticalLog2Model;

MOVABLE_MODEL_MAP["vertical-log3"] = VerticalLog2Model.extend({
    defaults:function(){
        return _.extend( VerticalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log3"
        } )
    }
})

MOVABLE_MODEL_MAP["vertical-log4"] = VerticalLog2Model.extend({
    defaults:function(){
        return _.extend( VerticalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log4"
        } )
    }
})

MOVABLE_MODEL_MAP["vertical-log5"] = VerticalLog2Model.extend({
    defaults:function(){
        return _.extend( VerticalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log5"
        } )
    }
})

MOVABLE_MODEL_MAP["vertical-log6"] = VerticalLog2Model.extend({
    defaults:function(){
        return _.extend( VerticalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log6"
        } )
    }
})

MOVABLE_MODEL_MAP["vertical-log7"] = VerticalLog2Model.extend({
    defaults:function(){
        return _.extend( VerticalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log7"
        } )
    }
})

var HorizontalLog2Model = NeutralMovable.extend({
    defaults:function(){
        return _.extend( NeutralMovable.prototype.defaults.call(this),{
            type: "horizontal-log2",
            isShowLevel: false
        } )
    },
    isMovable:function(direction){
        return NeutralMovable.prototype.isMovable.call(this,direction) && (direction === DIRECTION_UP || direction === DIRECTION_DOWN);
    }
})
MOVABLE_MODEL_MAP["horizontal-log2"] = HorizontalLog2Model;

MOVABLE_MODEL_MAP["horizontal-log3"] = HorizontalLog2Model.extend({
    defaults:function(){
        return _.extend( HorizontalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log3"
        } )
    }
})

MOVABLE_MODEL_MAP["horizontal-log4"] = HorizontalLog2Model.extend({
    defaults:function(){
        return _.extend( HorizontalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log4"
        } )
    }
})

MOVABLE_MODEL_MAP["horizontal-log5"] = HorizontalLog2Model.extend({
    defaults:function(){
        return _.extend( HorizontalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log5"
        } )
    }
})

MOVABLE_MODEL_MAP["horizontal-log6"] = HorizontalLog2Model.extend({
    defaults:function(){
        return _.extend( HorizontalLog2Model.prototype.defaults.call(this),{
            type: "vertical-log6"
        } )
    }
})
