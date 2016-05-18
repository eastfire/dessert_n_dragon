var GameOverDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        clearRoom();

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.isWin = options.isWin;
        this.isFirstPass = options.isFirstPass;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: cc.winSize.width - 50,
            height: 300
        })

        var stageNumber = this.model.get("stageNumber");
        var resultLabel = new cc.LabelTTF(stageNumber?("第"+stageNumber+"关 "+(this.isWin?"成功":"失败")):"无尽关卡", null, 25 );
        resultLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
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
                x: (this.width) / 2,
                y: 200,
                anchorX: 0.5,
                anchorY: 0.5
            });
            this.addChild(scoreLabel);
            this.addStar((this.width)/2-60, 160, (!scoreCondition && roomScore ) || (scoreCondition && roomScore >= scoreCondition[0] ) )
            this.addStar((this.width)/2, 160, (!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[1]))
            this.addStar((this.width)/2+60, 160,(!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[2]))
        } else {
            var reason;
            if ( this.model.getHero().get("hp") <= 0 ) {
                reason = "你失去了所有生命";
            } else {
                if ( !this.model.checkWinCondition() ) {
                    reason = this.model.getFailReason();
                }
            }
            var failReasonLabel = new cc.LabelTTF(reason, null, 25 );
            failReasonLabel.attr({
                color: colors.gameOver.ok,
                x: this.width/2,
                y: 160,
                anchorX: 0.5,
                anchorY: 0.5
            });
            this.addChild(failReasonLabel);
        }

        var retryItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    var stageNumber = this.model.get("stageNumber")
                    if ( stageNumber !== 0 ) {
                        cc.director.runScene(new RoomScene({
                            roomEntry: _.extend(clone(rooms[stageNumber-1]),  //没有经过select room的话rooms中没有stageNumber，所以要补上
                                {
                                    stageNumber: stageNumber
                                }),
                            maxScore: score[stageNumber]
                        }));
                    } else {
                        cc.director.runScene(new RoomScene({
                            roomEntry: clone(infiniteRoom),
                            maxScore: score[0]
                        }));
                    }
                });
            }, this);

        retryItem.attr({
            x: this.width/2 - 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var retryLabel = new cc.LabelTTF("再试一次", null, 25 );
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
                    if ( this.isWin ) {
                        if ( this.model.unlockUnlockable() ) {
                            //wait unlock-info
                            cc.log("somethingUnlocked")
                            this.modalLayer.removeFromParent(true);
                        } else {
                            cc.director.runScene(new SelectRoomScene());
                        }
                    } else {
                        cc.director.runScene(new SelectRoomScene());
                    }
                });
            }, this);

        okItem.attr({
            x: this.isWin ? this.width/2 : (this.width/2 + 100),
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

        currentRoom.blockInput();
        currentRoomSprite.stopClock();
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
