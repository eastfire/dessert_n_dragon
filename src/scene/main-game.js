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

var MainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var room = new BasicRoom();

        window.currentRoom = room;
        window.currentRoomSprite = new RoomSprite({
            model: room
        })
        currentRoomSprite.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        })
        this.addChild(currentRoomSprite);

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
    initEvent:function() {
        currentRoom.on("change:score",this.onScoreChange,this);
        currentRoom.getHero().on("change:hp",this.onHpChange, this);
        currentRoom.getHero().on("change:maxHp",this.onMaxHpChange, this);
        currentRoom.getHero().on("change:exp",this.onExpChange, this);
        currentRoom.getHero().on("change:requireExp",this.onRequireExpChange, this);
        currentRoom.on("change:turnNumber",this.onTurnNumberChange,this);
        currentRoom.on("change:statistic",this.onStatisticChange,this);

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
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

