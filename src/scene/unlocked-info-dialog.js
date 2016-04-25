var UnlockedInfoDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.modalLayer = options.modalLayer;
        this.unlock = options.unlock;
        this.callback = options.callback;
        this.context = options.context;

        this.dialogWidth = cc.winSize.width - 50;
        this.dialogHeight = 400;
        this.attr({
            x:-cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: this.dialogWidth,
            height: this.dialogHeight
        });
        
        var label = new ccui.Text(texts.unlock[this.unlock], "Arial", dimens.movableInfo.nameLabel.fontSize );
        label.enableOutline(colors.movableInfo.nameLabel.outline, dimens.movableInfo.nameLabel.outlineWidth);
        label.setTextColor(colors.movableInfo.nameLabel.inside);
        label.attr({
            x: dialogWidth/2,
            y: dialogHeight/2
        });
        this.addChild(label);
        
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, cc.winSize.width, 0).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, cc.winSize.width, 0),
            cc.removeSelf(),
            cc.callFunc(function(){
                this.callback.call(this.context);
            },this)
        ))
    }
});
