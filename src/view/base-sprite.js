var BaseSprite = cc.Sprite.extend({
    ctor: function (options) {
        this.options = options;
        this.model = options.model;
        var initFrame = this.getInitFrame();
        if ( initFrame ) this._super(initFrame)
        else this._super();

        this.model.on("destroy", this.onDestroy, this)
    },
    onDestroy:function(){
        this.model.off();
        this.removeAllChildren(true);
        this.removeFromParent(true);
        this.model = null;
    },
    getInitFrame:function(){
        var frameName = this.getInitFrameName();
        return frameName ? cc.spriteFrameCache.getSpriteFrame( frameName ) : null;
    },
    getInitFrameName:function(){
        return null;
    }
});