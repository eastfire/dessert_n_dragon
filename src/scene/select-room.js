var SelectRoomLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
    }
});

var SelectRoomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectRoomLayer();
        this.addChild(layer);
    }
});