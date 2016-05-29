var IntroLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(new cc.color(0x0, 0x0, 0x0));
        var cover = new cc.Sprite(res.intro_png);
        cover.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        })
        this.addChild(cover);

        var savedRoom = loadRoom();
        if ( savedRoom ) {
            var label = new cc.LabelTTF("继续上次中断的游戏？", null, 22 );
            label.attr({
                color: cc.color.WHITE,
                x: cc.winSize.width/2,
                y: 300
            });
            this.addChild(label);

            var okItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    cc.director.runScene(new RoomScene({
                        roomEntry: clone(savedRoom),
                        maxScore: score[savedRoom.stageNumber]
                    }));
                }, this);

            okItem.attr({
                x: cc.winSize.width/2,
                y: 250
            });
            var okLabel = new cc.LabelTTF("是", null, 22 );
            okLabel.attr({
                color: cc.color.BLACK,
                x: 90,
                y: 18
            });
            okItem.addChild(okLabel);

            var closeItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    clearRoom();
                    cc.director.runScene(new SelectRoomScene());
                }, this);

            closeItem.attr({
                x: cc.winSize.width/2,
                y: 200
            });
            var closeLabel = new cc.LabelTTF("否", null, 22 );
            closeLabel.attr({
                color: cc.color.BLACK,
                x: 90,
                y: 18
            });
            closeItem.addChild(closeLabel);

            var menu = new cc.Menu([closeItem,okItem]);
            this.addChild(menu,100);
            menu.attr({
                x:0,
                y:0,
                anchorX:0,
                anchorY: 0
            })
        } else {
            cc.eventManager.addListener(this.listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    return true;
                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {
                    if ( score[1] )
                        cc.director.runScene(new SelectRoomScene());
                    else {
                        cc.director.runScene(new RoomScene({
                            roomEntry: clone(rooms[0]),
                            maxScore: 0
                        }));
                    }
                }
            }), this);
        }
    }
});


var IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new IntroLayer();
        this.addChild(layer);
    }
});
