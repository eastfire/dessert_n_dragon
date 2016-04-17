var CardSprite = BaseSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.setName(this.model.cid);
        this.initCardLayout();
        this.renderWait();
        this.renderLevel();
    },
    onEnter:function(){
        this._super();
        this.initEvent();
    },
    onExit:function(){
        this.closeEvent();
        this._super();
    },
    initEvent:function(){
        this.model.on("change:waitTurn",this.renderWait, this);
        this.model.on("change:level",this.renderLevel,this);
        this.model.on("use",this.useCard,this);

        cc.eventManager.addListener(this.listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (currentRoom.isAcceptInput()) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if ( target.model.canUse()) {
                            return true;
                        }
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
                target.model.use();
            }
        }, this);
    },
    closeEvent:function(){
        this.model.off("change:waitTurn",this.renderWait);
        this.model.off("change:level",this.renderLevel);
        cc.eventManager.removeListeners(this.listener);
    },
    initCardLayout:function(){
        this.disableMask = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("card-disabled-mask.png"));
        this.disableMask.attr({
            x: dimens.card_size.width/2,
            y: dimens.card_size.height/2
        })
        this.addChild(this.disableMask);

        this.waitIcon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-wait.png"));
        this.addChild(this.waitIcon);
        this.waitIcon.attr({
            x: dimens.card.waitIcon.x,
            y: dimens.card.waitIcon.y
        })

        this.waitLabel = new ccui.Text("", "Arial", dimens.card.waitLabel.fontSize);
        this.waitLabel.enableOutline(colors.card.waitLabel.outline, dimens.card.waitLabel.outlineWidth);
        this.waitLabel.setTextColor(colors.card.waitLabel.inside);
        this.waitLabel.attr({
            //color: colors.tableLabel,
            x: dimens.card.waitLabel.x,
            y: dimens.card.waitLabel.y
        });
        this.addChild(this.waitLabel);


        if ( this.model.get("isShowLevel") ) {
            var icon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-level.png"));
            this.addChild(icon);
            icon.attr({
                x: dimens.card.levelIcon.x,
                y: dimens.card.levelIcon.y
            })

            this.levelLabel = new ccui.Text("", "Arial", dimens.card.levelLabel.fontSize);
            this.levelLabel.enableOutline(colors.card.levelLabel.outline, dimens.card.levelLabel.outlineWidth);
            this.levelLabel.setTextColor(colors.card.levelLabel.inside);
            this.levelLabel.attr({
                //color: colors.tableLabel,
                x: dimens.card.levelLabel.x,
                y: dimens.card.levelLabel.y
            });
            this.addChild(this.levelLabel);
        }
    },
    renderWait:function(){
        if ( this.model.get("waitTurn") ){
            this.waitIcon.setVisible(true);
            this.waitLabel.setVisible(true);
            this.waitLabel.setString(this.model.getWait())
            this.disableMask.setVisible(true);
        }  else {
            this.waitIcon.setVisible(false);
            this.waitLabel.setVisible(false);
            this.disableMask.setVisible(false);
        }
    },
    renderLevel:function(){
        if ( this.levelLabel ) this.levelLabel.setString(this.model.get("level"))
    },
    getInitFrameName:function(){
        return "card-"+this.model.get("type")+".png";
    },
    useCard:function(){
        //TODO add many effect
        this.model.afterUse();
    }
});