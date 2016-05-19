var MovableInfoDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.dialogWidth = cc.winSize.width - 50;
        this.dialogHeight = 400;
        this.attr({
            x:-cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: this.dialogWidth,
            height: this.dialogHeight
        })

        if ( this.model instanceof EnemyModel || this.model instanceof NeutralMovable || this.model instanceof ItemModel ) {
            this.initMovableLabel();
        }
        currentRoomSprite.stopClock();
    },
    initMovableLabel:function(){
        var frameName = this.model.get("type")+( this.model.get("subtype") ? ("-"+this.model.get("subtype") ) : "")+".png";
        var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( frameName ));
        sprite.attr({
            x:dimens.movableInfo.portrait.x,
            y:dimens.movableInfo.portrait.y
        })
        var scale = Math.min( dimens.tileSize.width/sprite.width, dimens.tileSize.height/sprite.height);
        sprite.attr({
            scaleX: scale,
            scaleY: scale
        });
        this.addChild(sprite);
        
        if ( this.model.get("level") && this.model.get("isShowLevel")) {
            var label = new ccui.Text("lv"+this.model.get("level"), "Arial", dimens.movableInfo.levelLabel.fontSize );
            label.enableOutline(colors.movableInfo.levelLabel.outline, dimens.movableInfo.levelLabel.outlineWidth);
            label.setTextColor(colors.movableInfo.levelLabel.inside);
            label.attr({
                x: dimens.movableInfo.levelLabel.x,
                y: dimens.movableInfo.levelLabel.y
            });
            this.addChild(label);
        }

        if ( this.model instanceof EnemyModel) {
            var label = new ccui.Text("攻击力"+this.model.getAttackPoint(), "Arial", dimens.movableInfo.levelLabel.fontSize );
            label.enableOutline(colors.movableInfo.levelLabel.outline, dimens.movableInfo.levelLabel.outlineWidth);
            label.setTextColor(colors.movableInfo.levelLabel.inside);
            label.attr({
                x: dimens.movableInfo.levelLabel.x,
                y: dimens.movableInfo.levelLabel.y - 40
            });
            this.addChild(label);
        }
        
        var label = new ccui.Text(texts.movable[this.model.get("type")].name, "Arial", dimens.movableInfo.nameLabel.fontSize );
        label.enableOutline(colors.movableInfo.nameLabel.outline, dimens.movableInfo.nameLabel.outlineWidth);
        label.setTextColor(colors.movableInfo.nameLabel.inside);
        label.attr({
            x: dimens.movableInfo.nameLabel.x,
            y: dimens.movableInfo.nameLabel.y
        });
        this.addChild(label);
        
        var label = new cc.LabelTTF(texts.movable[this.model.get("type")].desc, "Arial", dimens.movableInfo.descLabel.fontSize);
        label.attr({
            color:colors.movableInfo.descLabel.inside,
            x: dimens.movableInfo.descLabel.x,
            y: dimens.movableInfo.descLabel.y,
            anchorY: 1,
            textAlign: cc.TEXT_ALIGNMENT_LEFT,
            boundingWidth : dimens.movableInfo.descLabel.boundingWidth
        });
        this.addChild(label);
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, cc.winSize.width, 0).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog/3, cc.winSize.width, 0),
            cc.removeSelf(),
            cc.callFunc(function(){
                currentRoom.unblockInput();
                currentRoomSprite.startClock();
                this.modalLayer.removeFromParent(true)
            },this)
        ))
    }
})
