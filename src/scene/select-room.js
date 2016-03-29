var SelectRoomLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var currentY = 40;
        var stageNumber = 0;
        var isFirst = true;
        _.each(rooms,function(roomEntry){
            var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "palace1.png" ))
            sprite.attr({
                x: Math.sin( (currentY - 40)/1.5/360*2*3.1415926 ) * (cc.winSize.width/2-30) + cc.winSize.width/2,
                y: currentY,
                anchorX: 0.5,
                anchorY: 0.5
            })
            this.addChild(sprite);
            var selectable = false;
            if ( score[stageNumber] >= roomEntry.scoreCondition[0] ) {
                selectable = true;
                this.addStar(sprite, 0)
                if ( score[stageNumber] >= roomEntry.scoreCondition[1] ) {
                    this.addStar(sprite, 1)
                }
                if ( score[stageNumber] >= roomEntry.scoreCondition[2] ) {
                    this.addStar(sprite, 2)
                }
            } else {
                if (isFirst) {
                    selectable = true;
                    isFirst = false;
                } else {
                    selectable = false;
                }
            }
            if ( selectable ) {
                (function(stageNumber, roomEntry) {
                    cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,
                        onTouchBegan: function (touch, event) {
                            var target = event.getCurrentTarget();
                            var locationInNode = target.convertToNodeSpace(touch.getLocation());
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
                            cc.director.runScene(new RoomScene({
                                roomEntry: roomEntry
                            }));
                        }
                    }, sprite);
                })(stageNumber, roomEntry);
            } else {
                sprite.attr({
                    opacity: 64
                })
            }
            currentY += 40;
            stageNumber++;
        },this)
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
    }
});

var SelectRoomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectRoomLayer();
        this.addChild(layer);
    }
});