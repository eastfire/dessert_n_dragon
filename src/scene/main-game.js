var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var KEY_DIRECTION = {}
KEY_DIRECTION[KEY_UP] = 0;
KEY_DIRECTION[KEY_RIGHT] = 1;
KEY_DIRECTION[KEY_DOWN] = 2;
KEY_DIRECTION[KEY_LEFT] = 3;

var SWIPE_THRESHOLD_WIDTH = 20;
var SWIPE_THRESHOLD = 50;

var ModalDialogLayer = cc.Layer.extend({
    ctor:function(options) {
        this._super();
        var options = options || {}
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                if ( options.clickSideCancel ) {
                    event.getCurrentTarget().removeFromParent(true)
                }
            }
        }), this);
    }
});

var GameOverDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.isWin = options.isWin;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: cc.winSize.width - 100,
            height: 300
        })


        var resultLabel = new cc.LabelTTF(this.isWin?"成功":"失败", null, 25 );
        resultLabel.attr({
            color: colors.gameOver.ok,
            x: (cc.winSize.width - 100)/2,
            y: 260,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(resultLabel);

        var okItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear();
            }, this);

        okItem.attr({
            x: (cc.winSize.width - 100)/2,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var okLabel = new cc.LabelTTF("确定", null, 25 );
        okLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        okItem.addChild(okLabel);

        var menu = new cc.Menu([okItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, 0, -cc.winSize.height).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, 0, cc.winSize.height),
            cc.removeSelf(),
            cc.callFunc(function(){
                cc.director.runScene(new SelectRoomScene());
            },this)
        ))
    }
})

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

var MainLayer = cc.Layer.extend({
    ctor:function (options) {
        this._super();
        var room = new RoomModel(options.roomEntry);

        window.currentRoom = room;
        window.currentRoomSprite = new RoomSprite({
            model: room
        })
        currentRoomSprite.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        })
        this.addChild(currentRoomSprite);

        this.initMenu();
        this.initLabel();
        this.initConditionLabel();
        room.turnStart();
        this.renderHp();
        this.renderScore();
        this.renderExp();
        this.renderTurnNumber();

        return true;
    },
    onEnter: function () {
        this._super();
        this.initEvent();

    },
    onExit:function(){
        this._super();
        this.closeEvent();
    },
    initMenu:function(){
        var closeItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("close-default.png"),
            cc.spriteFrameCache.getSpriteFrame("close-press.png"),
            function () {
                var layer = new ModalDialogLayer({
                    clickSideCancel: true
                });
                this.addChild(layer,200);

                var dialog = new GameMenuDialog({
                    model: this.model,
                    modalLayer: layer
                })
                layer.addChild(dialog);
                dialog.appear();
            }, this);

        closeItem.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2,
            anchorX: 1,
            anchorY: 1
        });
        var menu = new cc.Menu([closeItem]);
        this.addChild(menu);
    },
    initLabel:function(){
        this.hpLabel = new ccui.Text("", "Arial", dimens.hpLabel.fontSize );
        this.hpLabel.enableOutline(colors.hpLabel.outline, dimens.hpLabel.outlineWidth);
        this.hpLabel.setTextColor(colors.hpLabel.inside);
        this.hpLabel.attr({
            //color: colors.tableLabel,
            x: dimens.hpLabel.x,
            y: dimens.hpLabel.y,
            anchorX: 0
        });
        this.addChild(this.hpLabel);

        this.expLabel = new ccui.Text("", "Arial", dimens.expLabel.fontSize );
        this.expLabel.enableOutline(colors.expLabel.outline, dimens.expLabel.outlineWidth);
        this.expLabel.setTextColor(colors.expLabel.inside);
        this.expLabel.attr({
            //color: colors.tableLabel,
            x: dimens.expLabel.x,
            y: dimens.expLabel.y,
            anchorX: 0
        });
        this.addChild(this.expLabel);

        this.scoreLabel = new ccui.Text("", "Arial", dimens.scoreLabel.fontSize );
        this.scoreLabel.enableOutline(colors.scoreLabel.outline, dimens.scoreLabel.outlineWidth);
        this.scoreLabel.setTextColor(colors.scoreLabel.inside);
        this.scoreLabel.attr({
            //color: colors.tableLabel,
            x: dimens.scoreLabel.x,
            y: dimens.scoreLabel.y
        });
        this.addChild(this.scoreLabel);

        this.turnNumberLabel = new ccui.Text("", "Arial", dimens.turnNumberLabel.fontSize );
        this.turnNumberLabel.enableOutline(colors.turnNumberLabel.outline, dimens.turnNumberLabel.outlineWidth);
        this.turnNumberLabel.setTextColor(colors.turnNumberLabel.inside);
        this.turnNumberLabel.attr({
            //color: colors.tableLabel,
            x: dimens.turnNumberLabel.x,
            y: dimens.turnNumberLabel.y
        });
        this.addChild(this.turnNumberLabel);
    },
    initConditionLabel:function(){
        this.conditionLabels = {};
        var killConditions = _.filter(currentRoom.get("winEveryConditions"),function(condition){
            return typeof condition === "object" &&
                ( condition.conditionType === "kill" || condition.conditionType === "kill-level" || condition.conditionType === "kill-max-level") ;
        })
        if ( !killConditions.length ) return;
        var stepX = cc.winSize.width / killConditions.length
        var x = stepX/2;
        _.each(killConditions,function(condition){
            this.createConditionLabel(x, dimens.condition.y, condition)
            this.renderConditionLabel(condition)
            x+=stepX;
        },this);
    },
    createConditionLabel:function(x, y, condition){
        var frameName = condition.type+( condition.subtype ? ("-"+condition.subtype) : "")+".png";
        var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( frameName ));
        sprite.attr({
            x:x-15,
            y:y,
            scaleX: dimens.condition.scale,
            scaleY: dimens.condition.scale
        })
        this.addChild(sprite);

        var label = this.conditionLabels[condition.conditionType+"_"+condition.type+( condition.subtype ? ("_"+condition.subtype):"")] = new ccui.Text("", "Arial", dimens.conditionLabel.fontSize );
        label.enableOutline(colors.conditionLabel.outline, dimens.conditionLabel.outlineWidth);
        label.setTextColor(colors.conditionLabel.inside);
        label.attr({
            //color: colors.tableLabel,
            x: x+30,
            y: y
        });
        this.addChild(label);
    },
    renderConditionLabel:function(condition){
        var label = this.conditionLabels[condition.conditionType+"_"+condition.type+( condition.subtype ? ("_"+condition.subtype):"")];
        if ( !label ) return;
        var statistic = currentRoom.get("statistic");
        var enemyType = condition.type+( condition.subtype ? ("_"+condition.subtype) : "");
        var statisticItem = "kill-level-"+enemyType;
        statistic[statisticItem] = statistic[statisticItem] || 0;
        label.setString( Math.max(0, condition.number - statistic[statisticItem]) );
    },
    renderHp:function(){
        this.hpLabel.setString("生命:"+currentRoom.getHero().get("hp")+"/"+currentRoom.getHero().get("maxHp"))
    },
    renderScore:function(){
        this.scoreLabel.setString("分数:"+currentRoom.get("score"));
    },
    renderExp:function(){
        this.expLabel.setString("卡路里:"+currentRoom.getHero().get("exp")+"/"+currentRoom.getHero().get("requireExp"))
    },
    renderTurnNumber:function(){
        if ( currentRoom.get("turnLimit") ) {
            this.turnNumberLabel.setString("移动次数:" + (currentRoom.get("turnLimit") - currentRoom.get("turnNumber")));
        }
    },
    onScoreChange:function(){
        this.renderScore();
    },
    onHpChange:function(){
        this.renderHp();
    },
    onMaxHpChange:function(){
        this.renderHp();
    },
    onExpChange:function(){
        this.renderExp();
    },
    onRequireExpChange:function(){
        this.renderExp();
    },
    onTurnNumberChange:function(){
        this.renderTurnNumber();
    },
    onStatisticChange:function(){
        _.each(currentRoom.get("winEveryConditions"),function(condition){
            if ( typeof condition === "object" &&
                ( condition.conditionType === "kill" || condition.conditionType === "kill-level" || condition.conditionType === "kill-max-level") ){
                this.renderConditionLabel(condition);
            }
        },this)
    },
    onGameOver:function(roomModel, isWin){
        if ( isWin ) {
            var oldScore = score[roomModel.get("stageNumber")];
            if ( !oldScore || oldScore < roomModel.get("score") ) {
                score[roomModel.get("stageNumber")] = roomModel.get("score");
                saveScore();
            }
        }

        var layer = new ModalDialogLayer({
            clickSideCancel: true
        });
        this.addChild(layer,200);

        var dialog = new GameOverDialog({
            model: this.model,
            modalLayer: layer,
            isWin: isWin
        })
        layer.addChild(dialog);
        dialog.appear();
    },
    initEvent:function() {
        currentRoom.on("change:score",this.onScoreChange,this);
        currentRoom.getHero().on("change:hp",this.onHpChange, this);
        currentRoom.getHero().on("change:maxHp",this.onMaxHpChange, this);
        currentRoom.getHero().on("change:exp",this.onExpChange, this);
        currentRoom.getHero().on("change:requireExp",this.onRequireExpChange, this);
        currentRoom.on("change:turnNumber",this.onTurnNumberChange,this);
        currentRoom.on("change:statistic",this.onStatisticChange,this);
        currentRoom.on("game-over",this.onGameOver,this)

        if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    if (currentRoom.isAcceptInput()) {
                        if ( KEY_DIRECTION[key] !== undefined ) {
                            window.currentRoomSprite.shift(KEY_DIRECTION[key])
                        }
                    }
                },
                onKeyReleased: function (key, event) {
                }
            }, this);
        }
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (currentRoom.isAcceptInput()) {
                    var target = event.getCurrentTarget();
                    var locationInNode = touch.getLocation();
                    if (cc.rectContainsPoint(currentRoomSprite.getRect(), locationInNode)) {
                        target.prevX = locationInNode.x;
                        target.prevY = locationInNode.y;
                        return true;
                    }
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = touch.getLocation();
                var currentX = locationInNode.x;
                var currentY = locationInNode.y;
                var prevX = target.prevX;
                var prevY = target.prevY;
                if ( Math.abs(currentX - target.prevX) < SWIPE_THRESHOLD_WIDTH ) {
                    if ( currentY > target.prevY + SWIPE_THRESHOLD ) {
                        window.currentRoomSprite.shift(DIRECTION_UP)
                    } else if ( currentY < target.prevY - SWIPE_THRESHOLD ) {
                        window.currentRoomSprite.shift(DIRECTION_DOWN)
                    }
                }
                if ( Math.abs(currentY - target.prevY) < SWIPE_THRESHOLD_WIDTH ) {
                    if ( currentX > target.prevX + SWIPE_THRESHOLD ) {
                        window.currentRoomSprite.shift(DIRECTION_RIGHT)
                    } else if ( currentX < target.prevX - SWIPE_THRESHOLD ) {
                        window.currentRoomSprite.shift(DIRECTION_LEFT)
                    }
                }
            }
        }, currentRoomSprite);
    },
    closeEvent:function(){
        currentRoom.off("change:score",this.onScoreChange,this);
        currentRoom.getHero().off("change:hp",this.onHpChange, this);
        currentRoom.getHero().off("change:maxHp",this.onMaxHpChange, this);
        currentRoom.getHero().off("change:exp",this.onExpChange, this);
        currentRoom.getHero().off("change:requireExp",this.onRequireExpChange, this);
        currentRoom.off("change:turnNumber",this.onTurnNumberChange,this);

        if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
        }
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    }
});

var RoomScene = cc.Scene.extend({
    ctor:function(options){
        this._super();
        this.options = options;
    },
    onEnter:function () {
        this._super();
        var layer = new MainLayer(this.options);
        this.addChild(layer);
    }
});

