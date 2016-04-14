var CARD_SCALE_RATE = 0.75
var HandSprite = BaseSprite.extend({
    ctor: function (options) {
        this._super(options);

//        this.initStatus();
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
        var cards = this.model.getHand();
        _.each(cards,function(cardModel){
            var cardSprite = new CardSprite({model:cardModel});
            cardSprite.attr({
                x:0,
                y:0,
                scaleX : CARD_SCALE_RATE,
                scaleY : CARD_SCALE_RATE
            })
            this.addChild(cardSprite);
        },this);
    },
    onHandChange:function(){
        var needCurve = true;
        var cards = this.model.getHand();
        var index = 0;
        if ( cards.length == 0 ) {
            return;
        }
        var y = dimens.hands.y;


        var cardWidth = dimens.card_size.width * CARD_SCALE_RATE;
        var estimateWidth = cards.length * cardWidth + (cards.length-1) * dimens.hand_line_card_padding;
        var x;
        var stepX;
        if ( estimateWidth < cc.winSize.width ) {
            x = ( cc.winSize.width - estimateWidth ) / 2 + cardWidth/2;
            stepX = cardWidth + dimens.hand_line_card_padding;
        } else {
            x = cardWidth/2;
            stepX = ( cc.winSize.width - cardWidth ) / (cards.length - 1);
        }

        var i = 0;
        var r = 800;
        _.each(cards,function(cardModel){
            var realX, realY, angle, cardAngle;
            if ( needCurve ) {
                angle = ( x - cc.winSize.width / 2 ) /r;
                realX = Math.sin(angle) * r + cc.winSize.width / 2;
                realY = Math.cos(angle) * r + y - r - 10;
                cardAngle = angle * 50;
            } else {
                angle = 0;
                realX = x;
                realY = y;
            }
            var sprite = this.getChildByName(cardModel.cid);
            if ( sprite === null ) {
                sprite = new CardSprite({model:cardModel});
                sprite.attr({
                    x: cc.winSize.width/2,
                    y: cc.winSize.height/2,
                    scaleX : CARD_SCALE_RATE,
                    scaleY : CARD_SCALE_RATE
                })
                this.addChild(sprite);
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
