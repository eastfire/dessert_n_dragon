var NeutralMovable = MovableModel.extend({

});

var PillarModel = NeutralMovable.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "pillar",
            isMovable: false,
            isShowLevel: false
        } )
    }
})
MOVABLE_MODEL_MAP.pillar = PillarModel;