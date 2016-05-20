var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var KEY_DIRECTION = {}
KEY_DIRECTION[KEY_UP] = 0;
KEY_DIRECTION[KEY_RIGHT] = 1;
KEY_DIRECTION[KEY_DOWN] = 2;
KEY_DIRECTION[KEY_LEFT] = 3;

var SWIPE_THRESHOLD = 40;
var CLICK_THRESHOLD = 6;

var MainLayer = cc.Layer.extend({
    ctor:function (options) {
        this._super();

        var roomType = options.roomEntry.type || "normal";
        var room = new ROOM_MODEL_MAP[roomType](options.roomEntry);
        this.maxScore = options.maxScore;

        window.currentRoom = room;
        window.currentRoomSprite = new RoomSprite({
            model: room
        })
        currentRoomSprite.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        })
        this.addChild(currentRoomSprite);

        window.effectIconMananger = new EffectIconManager({
            layer:this
        });

        this.shiftArrowSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("shift-direction.png"));
        this.shiftArrowSprite.attr({
            x:currentRoomSprite.x,
            y:currentRoomSprite.y,
            scaleX: 3,
            scaleY: 3,
            opacity:75
        })
        this.addChild(this.shiftArrowSprite,90);
        this.shiftArrowSprite.setVisible(false);

        var handSprite = new HandSprite({
            model: room
        })
        handSprite.attr({
            x: 0,
            y: 0
        })
        this.addChild(handSprite);

        this.initMenu();
        this.initLabel();
        this.initDeck();
        this.initConditionLabel();

        this.initScoreBar();

        if ( room.get("phase") === PHASE_TURN_START ) {
            room.turnStart();
        }

        this.renderHp();
        this.renderScore();
        this.renderExp();
        this.renderTurnNumber();
        this.renderMoney();

        this.__unlocking = [];


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
                saveStatistic();

                var layer = new ModalDialogLayer({
                    clickSideCancel: true
                });
                this.addChild(layer,200);

                var dialog = new GameMenuDialog({
                    model: currentRoom,
                    modalLayer: layer
                })
                layer.setDialogSprite(dialog);
                layer.addChild(dialog);
                dialog.appear();
            }, this);

        closeItem.attr({
            x: dimens.closeItem.x,
            y: dimens.closeItem.y,
            anchorX: 1,
            anchorY: 1
        });
        var menu = new cc.Menu([closeItem]);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY: 0
        })
        this.addChild(menu);
    },
    initLabel:function(){
        var hpIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-hp.png"));
        hpIcon.attr({
            x: dimens.hpLabel.x - 20,
            y: dimens.hpLabel.y,
            scaleX: 0.7,
            scaleY: 0.7
        })
        this.addChild(hpIcon);

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

        var moneyIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-money.png"));
        moneyIcon.attr({
            x: dimens.mainGameMoneyLabel.x - 20,
            y: dimens.mainGameMoneyLabel.y,
            scaleX: 0.7,
            scaleY: 0.7
        })
        this.addChild(moneyIcon);

        this.moneyLabel = new ccui.Text("", "Arial", dimens.mainGameMoneyLabel.fontSize );
        this.moneyLabel.enableOutline(colors.hpLabel.outline, dimens.mainGameMoneyLabel.outlineWidth);
        this.moneyLabel.setTextColor(colors.hpLabel.inside);
        this.moneyLabel.attr({
            //color: colors.tableLabel,
            x: dimens.mainGameMoneyLabel.x,
            y: dimens.mainGameMoneyLabel.y,
            anchorX: 0
        });
        this.addChild(this.moneyLabel);

        var expIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-stomach.png"))
        expIcon.attr({
            x: dimens.expLabel.x - 20,
            y: dimens.expLabel.y,
            scaleX: 0.7,
            scaleY: 0.7
        })
        this.addChild(expIcon);

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
        expIcon.setVisible(currentRoom.get("rules").heroCanGetExp );
        this.expLabel.setVisible(currentRoom.get("rules").heroCanGetExp );

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
        this.renderTimeNumber();
    },
    initConditionLabel:function(){
        this.conditionLabels = {};
        var conditionType = null;
        var killConditions = _.filter(currentRoom.get("winEveryConditions"),function(condition){
            if ( condition === "outOfTurn" ) {
                conditionType = condition;
                return false;
            }
            if ( typeof condition === "object" &&
                ( condition.conditionType === "kill" || condition.conditionType === "kill-level" || condition.conditionType === "kill-max-level") ){
                conditionType = condition.conditionType;
                return true;
            } else return false;
        })

        var conditionStrMap = {
            "kill": "吃掉足够多数量的敌人",
            "kill-level": "吃掉足够多等级的敌人",
            "kill-max-level": "吃掉等级足够高的敌人",
            "outOfTurn":"生存",
            getScore:(score[0]?("目标：最高分"+score[0]):"尽可能获得高分")
        };

        if ( !conditionType ) conditionType = "getScore";

        var label = new ccui.Text(conditionStrMap[conditionType], "Arial", dimens.conditionLabel.fontSize );
        label.enableOutline(colors.conditionLabel.outline, dimens.conditionLabel.outlineWidth);
        label.setTextColor(colors.conditionLabel.inside);
        label.attr({
            //color: colors.tableLabel,
            x: cc.winSize.width/2 - 100,
            y: dimens.condition.y +50
        });
        this.addChild(label);

        if ( !killConditions.length ) return;

        var stepX = cc.winSize.width / killConditions.length
        var x = stepX/2;
        _.each(killConditions,function(condition){
            this.createConditionLabel(x, dimens.condition.y, condition)
            this.renderConditionLabel(condition)
            x+=stepX;
        },this);
    },
    initScoreBar:function() {
        var scoreCondition = currentRoom.get("scoreCondition");
        if ( !scoreCondition ) {
            return;
        }

        if (!this.maxScore || this.maxScore < scoreCondition[2]) {
            this.maxScore = scoreCondition[2];
        }

        this.scoreBar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("score-bar.png"));
        this.scoreBar.attr({
            x: dimens.scoreBar.x,
            y: dimens.scoreBar.y,
            anchorX: 0,
            scaleX: 0
        })
        this.addChild(this.scoreBar);

        this.scoreBarFG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("score-bar-fg.png"));
        this.scoreBarFG.attr({
            x: dimens.scoreBarFG.x,
            y: dimens.scoreBarFG.y,
            anchorX: 0
        })
        this.addChild(this.scoreBarFG,10);

        this.scoreLine = [];
        for ( var i = 0; i < 3; i++) {
            this.scoreLine[i] = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("fill-score-line.png"));
            this.scoreLine[i].attr({
                x: scoreCondition[i] / this.maxScore * dimens.scoreBar.width + dimens.scoreBar.x,
                y: dimens.scoreBar.y - 4
            })
            this.addChild(this.scoreLine[i],11)
        }
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
    initDeck:function(){
        this.deckIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-deck.png"))
        this.deckIcon.attr({
            x: dimens.deckIcon.x,
            y: dimens.deckIcon.y
        })
        this.deckLabel = new ccui.Text("", "Arial", dimens.deckLabel.fontSize );
        this.deckLabel.enableOutline(colors.deckLabel.outline, dimens.deckLabel.outlineWidth);
        this.deckLabel.setTextColor(colors.deckLabel.inside);
        this.deckLabel.attr({
            x: 20,
            y: 30
        });
        this.deckIcon.addChild(this.deckLabel)
        this.addChild(this.deckIcon);

        this.renderDeck();
    },
    switchRoom:function(){
        
    },
    renderDeck:function(){
        if ( currentRoom.getHand().length + currentRoom.getDeck().length + currentRoom.getDiscard().length > 0 ){
            this.deckIcon.setVisible(true);
            this.deckLabel.setString( currentRoom.getDeck().length+currentRoom.getDiscard().length )
        } else {
            this.deckIcon.setVisible(false);
        }
        var prevForbid = currentRoom.getHero().previous("forbidDraw");
        var currentForbid = currentRoom.getHero().get("forbidDraw");
        if ( prevForbid && !currentForbid ) {
//TODO
        } else if ( !prevForbid && currentForbid ) {

        }
    },
    renderConditionLabel:function(condition){
        var label = this.conditionLabels[condition.conditionType+"_"+condition.type+( condition.subtype ? ("_"+condition.subtype):"")];
        if ( !label ) return;
        var statistic = currentRoom.get("statistic");
        var enemyType = condition.type+( condition.subtype ? ("_"+condition.subtype) : "");
        if ( condition.conditionType === "kill-level" || condition.conditionType === "kill" ) {
            var statisticItem = condition.conditionType+"-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            var number = Math.max(0, condition.number - statistic[statisticItem]);
            label.setString(number?number:" √");
        } else if (condition.conditionType === "kill-max-level") {
            var statisticItem = condition.conditionType+"-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            label.setString( "lv"+condition.number+ (condition.number > statistic[statisticItem] ? "": "√"));
        }
    },
    renderHp:function(){
        this.hpLabel.setString(currentRoom.getHero().get("hp")+"/"+currentRoom.getHero().get("maxHp"))
    },
    renderMoney:function(){
        this.moneyLabel.setString(gameStatus.get("money"));
    },
    renderScore:function(){
        var score = currentRoom.get("score");
        this.scoreLabel.setString("分数:"+score);
        if ( this.scoreBar ) {
            var scale = Math.min(1,score / this.maxScore) * dimens.scoreBar.width / dimens.scoreBar.resWidth
            this.scoreBar.runAction(cc.scaleTo(times.scoreBar,scale,1));
        }
    },
    renderExp:function(){
        this.expLabel.setString(currentRoom.getHero().get("exp")+"/"+currentRoom.getHero().get("requireExp"))
    },
    renderTurnNumber:function(){
        if ( currentRoom.get("turnLimit") ) {
            this.turnNumberLabel.setString("移动次数:" + (currentRoom.get("turnLimit") - currentRoom.get("turnNumber")));
        } else {
            this.turnNumberLabel.setString("第"+(currentRoom.get("turnNumber")+1)+"回合");
        }
    },
    renderTimeNumber:function(){
        if ( currentRoom.get("timeLimit") ) {
            this.turnNumberLabel.setString("剩余时间:" + this.__processTimeStr(currentRoom.get("timeLimit") - currentRoom.get("timeNumber")));
        }
    },
    __processTimeStr:function(time){
        time = Math.round(Math.max(0, time));
        var rest = time%60;
        return Math.floor(time/60)+":"+(rest>10?rest:("0"+rest));
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
    onTimeNumberChange:function(){
        this.renderTimeNumber()
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
        if ( this.alreadyGameOver ) return;
        this.alreadyGameOver = true; //防止多次触发gameover

        var isFirstPass = false;
        if ( isWin ) {
            var oldScore = score[roomModel.get("stageNumber")];
            if ( !oldScore ) {
                isFirstPass = true;
            }
            if ( !oldScore || oldScore < roomModel.get("score") ) {
                score[roomModel.get("stageNumber")] = roomModel.get("score");
                saveScore();
            }
        }
        //save statistic
        saveStatistic();

        var layer = new ModalDialogLayer({
            clickSideCancel: false
        });
        this.addChild(layer,200);

        var dialogClass;
        if ( currentRoom.get("stageNumber") === 0 ) {
            dialogClass = InfiniteGameOverDialog;
        } else {
            dialogClass = GameOverDialog;
        }
        var dialog = new dialogClass({
            model: currentRoom,
            modalLayer: layer,
            isWin: isWin,
            isFirstPass: isFirstPass
        })
        layer.addChild(dialog);
        dialog.appear();
    },
    onUnlocked:function(unlocked){
        this.__unlocking.push(unlocked)
        this.notifyUnlocked();
    },
    notifyUnlocked:function(){
        if ( this.__modalLayer ) return;
        var unlocked = this.__unlocking.shift();
        cc.log(unlocked);
        if ( unlocked ) {
            this.__modalLayer = new ModalDialogLayer({
                clickSideCancel: true
            });
            this.addChild(this.__modalLayer,200);
            var dialog = new UnlockedInfoDialog({
                model: currentRoom,
                modalLayer: this.__modalLayer,
                unlocked: unlocked,
                callback:function(){
                    this.__modalLayer.setDialogSprite(null);
                    this.__modalLayer = null;
                    this.notifyUnlocked();
                },
                context : this
            })
            this.__modalLayer.setDialogSprite(dialog);
            this.__modalLayer.addChild(dialog);
            dialog.appear();
        } else {
            cc.director.runScene(new SelectRoomScene());
        }
    },
    onLevelUp:function(){
        this.showChoiceDialog();
    },
    showChoiceDialog:function(){
        cc.log("showChoiceDialog")
        var layer = new ModalDialogLayer({

        });
        this.addChild(layer,200);

        var dialog = new ChoiceDialog({
            model: currentRoom,
            modalLayer: layer,
            callback:function(){
                currentRoom.getHero().useRemainExp();
                currentRoom.nextPhase();
            },
            context:this
        })
        layer.addChild(dialog);
        dialog.appear();
    },
    showMovableInfoDialog:function(movableModel){
        currentRoom.blockInput();
        var layer = new ModalDialogLayer({
            clickSideCancel: true
        });
        this.addChild(layer,200);

        var dialog = new MovableInfoDialog({
            model: movableModel,
            modalLayer: layer
        })
        layer.setDialogSprite(dialog);
        layer.addChild(dialog);
        dialog.appear();
    },
    initEvent:function() {
        currentRoom.on("change:score",this.onScoreChange,this);
        gameStatus.on("change:money",this.renderMoney,this);
        currentRoom.getHero().on("change:hp",this.onHpChange, this);
        currentRoom.getHero().on("change:maxHp",this.onMaxHpChange, this);
        currentRoom.getHero().on("change:exp",this.onExpChange, this);
        currentRoom.getHero().on("change:requireExp",this.onRequireExpChange, this);
        currentRoom.getHero().on("levelUp",this.onLevelUp, this);
        currentRoom.getHero().on("change:forbidDraw",this.renderDeck, this);
        currentRoom.on("change:turnNumber",this.onTurnNumberChange,this);
        currentRoom.on("change:turnLimit",this.onTurnNumberChange,this);
        currentRoom.on("change:timeNumber",this.onTimeNumberChange,this);
        currentRoom.on("change:timeLimit",this.onTimeNumberChange,this);
        currentRoom.on("change:statistic",this.onStatisticChange,this);
        currentRoom.on("change:deck",this.renderDeck,this);
        currentRoom.on("game-over",this.onGameOver,this);
        currentRoom.on("new-movable",this.showMovableInfoDialog,this)
        currentRoom.on("switch-room",this.switchRoom,this)
        
        unlockedStatus.on("unlocked",this.onUnlocked,this);

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
        var self = this;
        this.roomRect = cc.rect(currentRoomSprite.x - cc.winSize.width / 2, currentRoomSprite.y - cc.winSize.width / 2,
            cc.winSize.width, cc.winSize.width);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (currentRoom.isAcceptInput()) {
                    var target = event.getCurrentTarget();
                    var locationInNode = touch.getLocation();
                    if (cc.rectContainsPoint(self.roomRect, locationInNode)) {
                        target.prevX = locationInNode.x;
                        target.prevY = locationInNode.y;
                        return true;
                    }
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = touch.getLocation();
                var currentX = locationInNode.x;
                var currentY = locationInNode.y;

                var deltaX = currentX - target.prevX;
                var deltaY = currentY - target.prevY;
                var isDizzy = currentRoom.getHero().get("dizzy");
                if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
                    self.shiftArrowSprite.setVisible(true);
                    self.shiftArrowSprite.attr({
                        rotation: isDizzy? 180:0
                    });
                } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
                    self.shiftArrowSprite.setVisible(true);
                    self.shiftArrowSprite.attr({
                        rotation: isDizzy? 0:180
                    });
                } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
                    self.shiftArrowSprite.setVisible(true);
                    self.shiftArrowSprite.attr({
                        rotation: isDizzy?270:90
                    });
                } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
                    self.shiftArrowSprite.setVisible(true);
                    self.shiftArrowSprite.attr({
                        rotation: isDizzy?90:270
                    });
                } else {
                    self.shiftArrowSprite.setVisible(false);
                }
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = touch.getLocation();
                var currentX = locationInNode.x;
                var currentY = locationInNode.y;
                var prevX = target.prevX;
                var prevY = target.prevY;
                var deltaX = currentX - target.prevX;
                var deltaY = currentY - target.prevY;
                if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
                    window.currentRoomSprite.shift(DIRECTION_UP)
                } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
                    window.currentRoomSprite.shift(DIRECTION_DOWN)
                } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
                    window.currentRoomSprite.shift(DIRECTION_RIGHT)
                } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
                    window.currentRoomSprite.shift(DIRECTION_LEFT)
                }

                if ( Math.abs(deltaY) < CLICK_THRESHOLD && Math.abs(deltaX) < CLICK_THRESHOLD ) {
                    var movableModel = window.currentRoomSprite.getMovableByTouchPosition(currentX,currentY);
                    if ( movableModel ) {
                        if ( movableModel instanceof HeroModel ) {

                        } else {
                            self.showMovableInfoDialog(movableModel);
                        }
                    }
                }
                self.shiftArrowSprite.setVisible(false);
            }
        }, currentRoomSprite);
    },
    closeEvent:function(){
        currentRoom.off("change:score",this.onScoreChange,this);
        gameStatus.off("change:money",this.renderMoney,this);
        currentRoom.getHero().off("change:hp",this.onHpChange, this);
        currentRoom.getHero().off("change:maxHp",this.onMaxHpChange, this);
        currentRoom.getHero().off("change:exp",this.onExpChange, this);
        currentRoom.getHero().off("change:requireExp",this.onRequireExpChange, this);
        currentRoom.getHero().off("levelUp",this.onLevelUp, this);
        currentRoom.getHero().off("change:forbidDraw",this.renderDeck, this);
        currentRoom.off("change:turnNumber",this.onTurnNumberChange,this);
        currentRoom.off("change:turnLimit",this.onTurnNumberChange,this);
        currentRoom.off("change:statistic",this.onStatisticChange,this);
        currentRoom.off("change:deck",this.renderDeck,this);
        currentRoom.off("game-over",this.onGameOver,this)
        unlockedStatus.off("unlocked",this.onUnlocked,this);
        currentRoom.off("new-movable",this.showMovableInfoDialog,this)
        currentRoom.off("switch-room",this.switchRoom,this)

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

