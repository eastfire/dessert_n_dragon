var SelectRoomLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var currentY = 40;
        var isFirst = true;
        var stageNumber = 1;

        this.initMoney();

        this.initMenu();

        var stepY = 50;
        
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height - 40-50));

        this.scrollView.x = 0;
        this.scrollView.y = 50;
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, rooms.length * stepY+currentY)));

        this.addChild(this.scrollView);

        var firstUnpassed = 0;
        _.each(rooms,function(roomEntry){
            var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "palace1.png" ))
            sprite.attr({
                x: Math.sin( (currentY - 40)/1.5/360*2*3.1415926 ) * (cc.winSize.width/2-30) + cc.winSize.width/2,
                y: currentY,
                anchorX: 0.5,
                anchorY: 0.5
            })
            var stageNumberLabel = new ccui.Text(stageNumber, "Arial", 20 );
            stageNumberLabel.enableOutline(colors.moneyLabel.outline, dimens.moneyLabel.outlineWidth);
            stageNumberLabel.setTextColor(colors.moneyLabel.inside);
            stageNumberLabel.attr({
                x: 30,
                y: 20
            });
            sprite.addChild(stageNumberLabel);
            this.scrollView.addChild(sprite);
            var selectable = false;
            roomEntry.stageNumber = stageNumber;
            var roomScore = score[stageNumber];
            var scoreCondition = roomEntry.scoreCondition;
            if ( (!scoreCondition && roomScore ) || (scoreCondition && roomScore >= scoreCondition[0] )) {
                selectable = true;
                this.addStar(sprite, 0)
                if ( (!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[1]) ) {
                    this.addStar(sprite, 1)
                }
                if ( (!scoreCondition && roomScore ) || (scoreCondition &&roomScore >= scoreCondition[2]) ) {
                    this.addStar(sprite, 2)
                }
            } else {
                if (isFirst) {
                    firstUnpassed = stageNumber;
                    selectable = true;
                    isFirst = false;
                } else {
                    selectable = false;
                }
            }
            if ( window.debugFlag ) selectable = true;
            if ( selectable ) {
                //TODO became menu item
                (function( roomEntry) {
                    cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: false,
                        onTouchBegan: function (touch, event) {
                            var target = event.getCurrentTarget();
                            var locationInNode = target.convertToNodeSpace(touch.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {
                                return true;
                            }
                            return false;
                        },
                        //Trigger when moving touch
                        onTouchMoved: function (touch, event) {
                        },
                        //Process the touch end event
                        onTouchEnded: function (touch, event) {
                            window.prevSelectRoom = roomEntry.stageNumber;
                            cc.director.runScene(new RoomScene({
                                roomEntry: clone(roomEntry),
                                maxScore: roomScore
                            }));
                        }
                    }, sprite);
                })( roomEntry);
            } else {
                sprite.attr({
                    opacity: 64
                })
            }
            currentY += stepY;
            stageNumber++;
        },this)

        if ( window.prevSelectRoom ) {
            this.scrollView.scrollToPercentVertical(100 * (1 - window.prevSelectRoom / rooms.length), 0.5, true);
        } else {
            if (firstUnpassed === 0) {
                this.scrollView.scrollToPercentVertical(0, 0.5, true);
            } else {
                this.scrollView.scrollToPercentVertical(100 * (1 - firstUnpassed / rooms.length), 0.5, true);
            }
        }
    },
    addStar:function(sprite, position){
        var star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "star.png" ))
        star.attr({
            y: 0,
            x: 5+25*position,
            scaleX: 0.7,
            scaleY: 0.7
        })
        sprite.addChild(star);
    },
    initMoney:function(){
        var topbar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "topbar.png" ))
        topbar.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height,
            anchorY: 1
        })
        this.addChild(topbar)
        var bottombar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "bottombar.png" ))
        bottombar.attr({
            x: cc.winSize.width/2,
            y: 0,
            anchorY: 0
        })
        this.addChild(bottombar)

        this.moneyLabel = new ccui.Text("", "Arial", dimens.moneyLabel.fontSize );
        this.moneyLabel.enableOutline(colors.moneyLabel.outline, dimens.moneyLabel.outlineWidth);
        this.moneyLabel.setTextColor(colors.moneyLabel.inside);
        this.moneyLabel.attr({
            //color: colors.tableLabel,
            x: dimens.moneyLabel.x,
            y: dimens.moneyLabel.y,
            anchorX: 0
        });
        this.addChild(this.moneyLabel);

        var icon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "icon-money.png" ))
        icon.attr({
            //color: colors.tableLabel,
            x: dimens.moneyLabel.x - 15,
            y: dimens.moneyLabel.y,
            scaleX: 0.5,
            scaleY: 0.5
        });
        this.addChild(icon);
        this.renderMoney();
    },
    initMenu:function(){
        var closeItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("close-default.png"),
            cc.spriteFrameCache.getSpriteFrame("close-press.png"),
            function () {
                cc.director.runScene(new IntroScene());
            }, this);

        closeItem.attr({
            x: dimens.closeItem.x,
            y: dimens.closeItem.y,
            anchorX: 1,
            anchorY: 1
        });

        var infiniteItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("palace-infinity.png"),
            cc.spriteFrameCache.getSpriteFrame("palace-infinity.png"),
            function () {
                /*if ( !unlockedStatus.isUnlocked("infinite") ) {
                    toast("通过第21关后解锁",{parent:this})
                } else {*/
                    cc.director.runScene(new RoomScene({
                        roomEntry: clone(infiniteRoom),
                        maxScore: score[0]
                    }));
                //}
            }, this);

        infiniteItem.attr({
            x: cc.winSize.width/10,
            y: 0,
            anchorX: 0.5,
            anchorY: 0
        });

        var shopItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("shop.png"),
            cc.spriteFrameCache.getSpriteFrame("shop.png"),
            function () {
                if ( !unlockedStatus.isUnlocked("shop-entry") ) {
                    toast("通过第4关后解锁",{parent:this})
                } else {
                    cc.director.pushScene(new ShopScene());
                }
            }, this);

        shopItem.attr({
            x: cc.winSize.width*7/10,
            y: 0,
            anchorX: 0.5,
            anchorY: 0
        });

        var achievementItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("achievement.png"),
            cc.spriteFrameCache.getSpriteFrame("achievement.png"),
            function () {
                cc.director.pushScene(new AchievementScene());
            }, this);

        achievementItem.attr({
            x: cc.winSize.width*3/10,
            y: 0,
            anchorX: 0.5,
            anchorY: 0
        });

        var perkItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("perk.png"),
            cc.spriteFrameCache.getSpriteFrame("perk.png"),
            function () {
                cc.director.pushScene(new SelectPerkScene());
            }, this);

        perkItem.attr({
            x: cc.winSize.width*5/10,
            y: 0,
            anchorX: 0.5,
            anchorY: 0
        });

        var menu = new cc.Menu([closeItem,infiniteItem,shopItem, achievementItem,perkItem]);
        this.addChild(menu,100);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY: 0
        })
        /*if ( !unlockedStatus.isUnlocked("infinite") ) {
            infiniteItem.opacity = 128;
        }*/
        if ( !unlockedStatus.isUnlocked("shop-entry") ) {
            shopItem.opacity = 128;
        }
    },
    renderMoney:function(){
        this.moneyLabel.setString(gameStatus.get("money"));
    },
    onEnter:function(){
        this._super();
        gameStatus.on("change:money",this.renderMoney,this)
    },
    onExit:function(){
        gameStatus.off("change:money")
        this._super();
    }
});

var SelectRoomScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new SelectRoomLayer();
        this.addChild(layer);
    }
});
