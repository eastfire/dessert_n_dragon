var GameOverDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.isWin = options.isWin;

        var dialogWidth = cc.winSize.width - 50;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: dialogWidth,
            height: 300
        })


        var resultLabel = new cc.LabelTTF(this.isWin?"成功":"失败", null, 25 );
        resultLabel.attr({
            color: colors.gameOver.ok,
            x: (dialogWidth)/2,
            y: 260,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(resultLabel);

        if ( this.isWin ) {
            var roomScore = this.model.get("score");
            var scoreCondition = this.model.get("scoreCondition");
            var scoreLabel = new cc.LabelTTF(roomScore, null, 25);
            scoreLabel.attr({
                color: colors.gameOver.ok,
                x: (dialogWidth) / 2,
                y: 200,
                anchorX: 0.5,
                anchorY: 0.5
            });
            this.addChild(scoreLabel);
            this.addStar((dialogWidth)/2-60, 160, (!scoreCondition && roomScore ) || (scoreCondition && roomScore >= scoreCondition[0] ) )
            this.addStar((dialogWidth)/2, 160, (!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[1]))
            this.addStar((dialogWidth)/2+60, 160,(!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[2]))
        }

        var retryItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    cc.director.runScene(new RoomScene({
                        roomEntry: rooms[this.model.get("stageNumber")],
                        maxScore: score[this.model.get("stageNumber")]
                    }));
                });
            }, this);

        retryItem.attr({
            x: dialogWidth/2 - 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var retryLabel = new cc.LabelTTF("重试", null, 25 );
        retryLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        retryItem.addChild(retryLabel);

        var okItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    cc.director.runScene(new SelectRoomScene());
                });
            }, this);

        okItem.attr({
            x: this.isWin ? dialogWidth/2 : (dialogWidth/2 + 100),
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var okLabel = new cc.LabelTTF(this.isWin?"继续":"放弃", null, 25 );
        okLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        okItem.addChild(okLabel);

        var menu = new cc.Menu(this.isWin?[okItem]:[okItem, retryItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);
    },
    addStar:function(x,y, pass){
        var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pass?"star.png":"empty-star.png"));
        sprite.attr({
            x: x,
            y: y
        })
        this.addChild(sprite);
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, 0, -cc.winSize.height).easing(cc.easeBounceOut())  )
    },
    disappear:function(callback){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, 0, cc.winSize.height),
            cc.removeSelf(),
            cc.callFunc(callback,this)
        ))
    }
})