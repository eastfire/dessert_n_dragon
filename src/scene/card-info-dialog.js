var CardInfoDialog = cc.Sprite.extend({
    ctor:function (options) {
        this._super();

        this.model = options.model;
        this.isLevelUp = options.isLevelUp;
        this.modalLayer = options.modalLayer;
        this.callback = options.callback;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: cc.winSize.width - 50,
            height: 600
        })

        var cardSprite = new CardSprite({
            showDetail: true,
            model:this.model
        });
        cardSprite.attr({
            x: this.width/2,
            y: this.height/2+50,
            scaleX: 2,
            scaleY: 2
        })
        this.addChild(cardSprite);

        var cardNameLabel = new cc.LabelTTF(getCardName(this.model.get("type")), null, 30 );
        cardNameLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
            y: this.height - 40,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(cardNameLabel)

        var desc = "最大等级"+this.model.getMaxLevel();
        desc += "  最多可得到"+(CARD_MODEL_MAP[this.model.get("type")].isActive?ACTIVE_CARD_NUMBER:PASSIVE_CARD_NUMBER)+"张"+"\n";
        if (this.isLevelUp){
            desc += getCardLevelUpDesc( this.model.get("type"), this.model.get("level"));
        } else {
            desc += getCardDesc( this.model.get("type"), this.model.get("level"));
        }
        var cardDescLabel = new cc.LabelTTF(desc, null, 22 );
        cardDescLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
            y: 100,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(cardDescLabel)
    },
    appear:function(){
//        this.runAction( cc.moveBy(times.gameOverDialog, 0, -cc.winSize.height).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        var callback = this.callback || function(){}
        this.runAction(cc.sequence(
            cc.delayTime(0.01),
            cc.removeSelf(),
            cc.callFunc(callback,this),
            cc.callFunc(function(){
                this.modalLayer.removeFromParent();
            },this)
        ))
    }
})
