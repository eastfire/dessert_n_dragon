var GameMenuDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: cc.winSize.width - 50,
            height: 300
        })

        var resultLabel = new cc.LabelTTF("第"+this.model.get("stageNumber")+"关", null, 25 );
        resultLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
            y: 260,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(resultLabel);

        var exitItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    cc.director.runScene(new SelectRoomScene());
                });
            }, this);

        exitItem.attr({
            x: (cc.winSize.width - 50)/2 - 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var exitLabel = new cc.LabelTTF("退出", null, 25 );
        exitLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        exitItem.addChild(exitLabel);

        var cancelItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    this.modalLayer.removeFromParent();
                });
            }, this);

        cancelItem.attr({
            x: (cc.winSize.width - 50)/2 + 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var cancelLabel = new cc.LabelTTF("取消", null, 25 );
        cancelLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        cancelItem.addChild(cancelLabel);

        var menu = new cc.Menu([exitItem, cancelItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        currentRoom.blockInput();
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, 0, -cc.winSize.height).easing(cc.easeBounceOut())  )
    },
    disappear:function(callback){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, 0, cc.winSize.height),
            cc.removeSelf(),
            cc.callFunc(callback,this),
            cc.callFunc(function(){
                currentRoom.unblockInput();
            },this)
        ))
    }
})
