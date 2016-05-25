var PERK_MAP = {};

var hookManager = new HookManager();

PERK_MAP.addHalfHp = Backbone.Model.extend({
    initialize:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT*1.5;
    },
    destroy:function(){
        CONSTITUTION_EFFECT = ORIGIN_CONSTITUTION_EFFECT;
        Backbone.Model.prototype.destroy.call(this)
    }
})