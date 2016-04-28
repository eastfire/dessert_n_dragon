var IntroLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(new cc.color(0x0, 0x0, 0x0));
        var cover = new cc.Sprite(res.intro_png);
        cover.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        })
        this.addChild(cover);
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
});


var IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new IntroLayer();
        this.addChild(layer);
    }
});
