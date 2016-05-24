var CardInfoDialog = cc.Sprite.extend({
    ctor:function (options) {
        this._super();

        this.model = options.model;
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
