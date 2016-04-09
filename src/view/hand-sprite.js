var HandSprite = BaseSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.initCards();
        this.onHandChange();
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
        this.model.on("change:hands",this.onHandChange, this);
    },
    closeEvent:function(){
        this.model.off("change:hands",this.onHandChange);
    },
    initCards:function(){
        var cards = this.model.getCards();
        _.each(cards,function(cardModel){
            var cardSprite = new CardSprite({model:cardModel});
            cardSprite.attr({
                x:0,
                y:0
            })
            this.addChild(cardSprite);
        },this);
    },
    onHandChange:function(){
        var needCurve = true;
        var cards = this.model.getCards();
        var index = 0;
        if ( cards.length == 0 ) {
            return;
        }
        var y = dimens.hands.y;

        var estimateWidth = cards.length * dimens.card_size.width + (cards.length-1) * dimens.hand_line_card_padding;
        var x;
        var stepX;
        if ( estimateWidth < cc.winSize.width ) {
            x = ( cc.winSize.width - estimateWidth ) / 2 + dimens.card_size.width/2;
            stepX = dimens.card_size.width + dimens.hand_line_card_padding;
        } else {
            x = dimens.card_size.width/2;
            stepX = ( cc.winSize.width - dimens.card_size.width ) / (cards.length - 1);
        }

        var i = 0;
        var r = 400;
        _.each(cards,function(cardModel){
            var realX, realY, angle, cardAngle;
            if ( needCurve ) {
                angle = ( x - cc.winSize.width / 2 ) /r;
                realX = Math.sin(angle) * r + cc.winSize.width / 2;
                realY = Math.cos(angle) * r + y - r + 20;
                cardAngle = angle * 50;
            } else {
                angle = 0;
                realX = x;
                realY = y;
            }
            var sprite = this.getParent().getChildByName(cardModel.cid);
            if ( sprite === null ) {
                sprite = new CardSprite({model:cardModel});
                sprite.attr({
                    x: cc.winSize.width/2
                    y: cc.winSize.height/2
                })
                this.addChild(srite);
            }
            if ( sprite.x != x || sprite.y != y) {
                sprite.runAction(
                    cc.spawn(
                        cc.moveTo(times.card_sort, realX, realY),
                        cc.rotateTo(times.card_sort, cardAngle, cardAngle)
                    ));
            }
            sprite.zIndex = i;
            i++;
            x += stepX;
        },this);

    }
});
