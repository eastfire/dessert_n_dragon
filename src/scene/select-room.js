var SelectRoomLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var currentY = 40;
        var isFirst = true;
        var stageNumber = 1;

        this.initMoney();

        var stepY = 50;
        
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height - 40));

        this.scrollView.x = 0;
        this.scrollView.y = 0;
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
            this.scrollView.addChild(sprite);
            var selectable = false;
            roomEntry.stageNumber = stageNumber;
            var roomScore = score[stageNumber]// = 100;
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
//            selectable = true;
            if ( selectable ) {
                (function( roomEntry) {
                    cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,
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
                            cc.director.runScene(new RoomScene({
                                roomEntry: roomEntry,
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

        this.scrollView.scrollToPercentVertical( 100*(1-firstUnpassed/rooms.length), 0.5,true);
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
    onEnter:function () {
        this._super();
        var layer = new SelectRoomLayer();
        this.addChild(layer);
    }
});
