var CardInfoDialog = cc.Sprite.extend({
    ctor:function (options) {
        this._super();

        this.model = options.model;
        this.isLevelUp = options.isLevelUp;
        this.modalLayer = options.modalLayer;

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: cc.winSize.width - 50,
            height: 600
        })

        var cardSprite = new CardSprite({model:this.model});
        cardSprite.attr({
            x: this.width/2,
            y: this.height/2,
            scaleX: 3,
            scaleY: 3
        })
        this.addChild(cardSprite);

        var cardNameLabel = new cc.LabelTTF(getCardName(this.model.get("type")), null, 30 );
        cardNameLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
            y: this.height - 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(cardNameLabel)

        var desc;
        if (this.isLevelUp){
            desc = getCardLevelUpDesc( this.model.get("type"), this.model.get("level"));
        } else {
            desc = getCardDesc( this.model.get("type"), this.model.get("level"));
        }
        var cardDescLabel = new cc.LabelTTF(desc, null, 24 );
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
    disappear:function(callback){
        this.runAction(cc.sequence(
//            cc.moveBy(times.gameOverDialog, 0, cc.winSize.height),
            cc.removeSelf(),
            cc.callFunc(callback,this),
            cc.callFunc(function(){

            },this)
        ))
    }
})
