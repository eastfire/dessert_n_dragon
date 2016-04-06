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
                this.disappear();
            }, this);

        okItem.attr({
            x: this.isWin ? dialogWidth/2 : (dialogWidth/2 - 100),
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

var ChoiceDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.model = options.model;
        this.modalLayer = options.modalLayer;
        this.level = options.level || this.model.getHero().get("level");

        this.dialogWidth = cc.winSize.width - 50
        this.attr({
            x:-cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: this.dialogWidth,
            height: 650
        })

        var titleLabel = new cc.LabelTTF("嗝，吃饱了。升到第"+this.level+"级了\n请选择一个奖励", null, 25 );
        titleLabel.attr({
            color: colors.gameOver.ok,
            x: this.dialogWidth/2,
            y: 600,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(titleLabel);

        this.initMenu();
    },
    initMenu:function(){
        this.choices = this.model.genLevelUpChoices();
        var stepY = 500/(this.choices.length+1);
        var y = 560-stepY;
        var menus = [];
        _.each(this.choices,function(choice){
            var menuItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("choice-default.png"),
                cc.spriteFrameCache.getSpriteFrame("choice-press.png"),
                function () {
                    choice.onChosen(currentRoom, choice.opt);
                    this.disappear();
                }, this);

            menuItem.attr({
                x: this.dialogWidth/2,
                y: y,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var descLabel = new cc.LabelTTF(choice.description, null, 25 );
            descLabel.attr({
                color: colors.gameOver.ok,
                x: this.dialogWidth/2,
                y: 50,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menuItem.addChild(descLabel);
            menus.push(menuItem)

            y -= stepY;
        },this);

        if ( this.model.get("rules").canRefreshChoice ) {
            var menuItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    var value = (this.model.get("refreshCount") + 1) * 5;
                    if (gameStatus.money >= value) {
                        gameStatus.money -= value;
                        saveGameStatus();
                        this.model.set("refreshCount", this.model.get("refreshCount") + 1);
                        this.menu.removeFromParent(true);
                        this.initMenu();
                    }
                }, this);

            menuItem.attr({
                x: this.dialogWidth - 100,
                y: 25,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var descLabel = new cc.LabelTTF("换一换（" + (this.model.get("refreshCount") + 1) * 5 + "$）", null, 22);
            descLabel.attr({
                color: colors.gameOver.ok,
                x: 90,
                y: 18,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menuItem.addChild(descLabel);
            menus.push(menuItem)
        }

        this.menu = new cc.Menu(menus);
        this.menu.x = 0;
        this.menu.y = 0;
        this.addChild(this.menu);
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, cc.winSize.width, 0).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        this.model.set("refreshCount", 0);
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, cc.winSize.width, 0),
            cc.removeSelf(),
            cc.callFunc(function(){
                this.modalLayer.removeFromParent(true)
            },this)
        ))
    }
})

var MainLayer = cc.Layer.extend({
    ctor:function (options) {
        this._super();
        var room = new RoomModel(options.roomEntry);
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

        this.initMenu();
        this.initLabel();
        this.initConditionLabel();

        this.initScoreBar();

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
        var hpIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-hp.png"));
        hpIcon.attr({
            x: dimens.hpLabel.x - 26,
            y: dimens.hpLabel.y,
            scaleX: 0.8,
            scaleY: 0.8
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

        var expIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-stomach.png"))
        expIcon.attr({
            x: dimens.expLabel.x - 26,
            y: dimens.expLabel.y,
            scaleX: 0.8,
            scaleY: 0.8
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
    },
    initConditionLabel:function(){
        this.conditionLabels = {};
        var conditionType = null;
        var killConditions = _.filter(currentRoom.get("winEveryConditions"),function(condition){
            if ( typeof condition === "object" &&
                ( condition.conditionType === "kill" || condition.conditionType === "kill-level" || condition.conditionType === "kill-max-level") ){
                conditionType = condition.conditionType;
                return true;
            } else return false;
        })
        if ( !killConditions.length ) return;

        var conditionStrMap = {
            "kill": "吃掉足够多数量的敌人",
            "kill-level": "吃掉足够多等级的敌人",
            "kill-max-level": "吃掉达到等级的敌人"
        };

        var label = new ccui.Text(conditionStrMap[conditionType], "Arial", dimens.conditionLabel.fontSize );
        label.enableOutline(colors.conditionLabel.outline, dimens.conditionLabel.outlineWidth);
        label.setTextColor(colors.conditionLabel.inside);
        label.attr({
            //color: colors.tableLabel,
            x: cc.winSize.width/2 - 100,
            y: dimens.condition.y +50
        });
        this.addChild(label);

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
    renderConditionLabel:function(condition){
        var label = this.conditionLabels[condition.conditionType+"_"+condition.type+( condition.subtype ? ("_"+condition.subtype):"")];
        if ( !label ) return;
        var statistic = currentRoom.get("statistic");
        var enemyType = condition.type+( condition.subtype ? ("_"+condition.subtype) : "");
        if ( condition.conditionType === "kill-level" || condition.conditionType === "kill" ) {
            var statisticItem = condition.conditionType+"-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            label.setString(Math.max(0, condition.number - statistic[statisticItem]));
        } else if (condition.conditionType === "kill-max-level") {
            var statisticItem = condition.conditionType+"-" + enemyType;
            statistic[statisticItem] = statistic[statisticItem] || 0;
            label.setString( condition.number+ (condition.number > statistic[statisticItem] ? "": "√"));
        }
    },
    renderHp:function(){
        this.hpLabel.setString(currentRoom.getHero().get("hp")+"/"+currentRoom.getHero().get("maxHp"))
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
            model: currentRoom,
            modalLayer: layer,
            isWin: isWin
        })
        layer.addChild(dialog);
        dialog.appear();
    },
    onLevelUp:function(){
        this.showChoiceDialog();
    },
    showChoiceDialog:function(){
        var layer = new ModalDialogLayer({

        });
        this.addChild(layer,200);

        var dialog = new ChoiceDialog({
            model: currentRoom,
            modalLayer: layer
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
        currentRoom.getHero().on("levelUp",this.onLevelUp, this);
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

