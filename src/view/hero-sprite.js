var ANIMATION_MAP = {};
var initAnimation= function(){
    ANIMATION_MAP["normalHero"] = [];

    _.each(DIRECTIONS,function(direction){
        var frames = [];
        for (var i = 0; i < 4; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame("normalHero" + direction + "attack"+i+".png");
            frames.push(frame);
        }
        for (var i = 3; i >= 0; i--) {
            var frame = cc.spriteFrameCache.getSpriteFrame("normalHero" + direction + "attack"+i+".png");
            frames.push(frame);
        }
        ANIMATION_MAP["normalHero"][direction] = {};
        ANIMATION_MAP["normalHero"][direction]["attack"] = new cc.Animate(new cc.Animation(frames, times.heroAttack*2/8));
        ANIMATION_MAP["normalHero"][direction]["attack"].retain();
    });
}

var HeroSprite = MovableSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.renderDispel();
    },

    initEvent:function(){
        this._super()
        this.model.on("attack", this.attack, this)
        this.model.on("hitForward", this.hitForward, this)
        this.model.on("hitMoveBack", this.hitMoveBack, this)
        this.model.on("miss", this.miss, this)
        this.model.on("change:hp", this.onChangeHp, this)
        
        //status
        _.each(["dizzy","cursed","poison"],function(status){
            this.model.on("change:"+status,this.renderStatus,this);
        },this)
        
        this.model.on("change:dispel",this.renderDispel,this);
    },
    attack:function(enemyModel, options){
        switch ( options.attackAction ) {
            case "normal":
                var increment = INCREMENTS[this.model.get("face")]
                var deltaX = dimens.tileSize.width*increment.x/2;
                var deltaY = dimens.tileSize.height*increment.y/2
                this.runAction(ANIMATION_MAP["normalHero"][this.model.get("face")]["attack"])
                this.runAction(cc.sequence(
                    cc.moveBy(times.heroAttack, deltaX, deltaY ),
                    cc.callFunc(function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },this)
                ))
                break;
            case "slash":
                var self = this;
                this.scheduleOnce(function(){
                    self.model.hitOrMiss(enemyModel, options)
                },times.heroAttack)
                break;
            case "tail-slash":
                var increment = DECREMENTS[this.model.get("face")]
                var deltaX = dimens.tileSize.width*increment.x/2;
                var deltaY = dimens.tileSize.height*increment.y/2
                //TODO animation
                this.runAction(cc.sequence(
                    cc.moveBy(times.heroAttack, deltaX, deltaY ),
                    cc.callFunc(function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },this),
                    cc.moveBy(times.heroAttack, -deltaX, -deltaY )
                ))
                break;
            case "whirl-slash":case "big-whirl-slash":
                if ( !this.__whirling ) {
                    this.__whirling = true;
                    this.runAction(cc.sequence(
                        cc.rotateBy(times.heroAttack, 360 ),
                        cc.callFunc(function(){
                            this.__whirling = false;

                        },this)
                    ))
                }
                this.scheduleOnce(function(){
                    this.model.hitOrMiss(enemyModel, options)
                },times.heroAttack)
                break;
            case "fire":
                var targetSprite = currentRoomSprite.getChildByName(enemyModel.cid);
                var rotation = Math.atan2(-targetSprite.y+this.y,targetSprite.x-this.x) * 180/3.14159;
                effectIconMananger.fly(this, targetSprite, {
                    icon:"fireball",
                    rotation: rotation,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    fromOffset:{
                        x: -23,
                        y: -23
                    },
                    toOffset:{
                        x: -23,
                        y: -23
                    },
                    time: times.useCard,
                    callback:function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },
                    context:this
                })

                break;
            case "meteor-shower":
                var targetSprite = currentRoomSprite.getChildByName(enemyModel.cid);
                effectIconMananger.fly(targetSprite, targetSprite, {
                    icon:"fireball",
                    rotation: 135,
                    scaleX: 0.3,
                    scaleY: 0.6,
                    fromOffset:{
                        x: -23+100,
                        y: -23+100
                    },
                    toOffset:{
                        x: -23,
                        y: -23
                    },
                    time: times.useCard,
                    callback:function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },
                    context:this
                })
                break;
            case "lightening":
                var targetSprite = currentRoomSprite.getChildByName(enemyModel.cid);
                effectIconMananger.fly(this, targetSprite, {
                    icon:"lightening",
                    fromOffset:{
                        x: -23,
                        y: -23
                    },
                    toOffset:{
                        x: -23,
                        y: -23
                    },
                    time: times.useCard,
                    callback:function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },
                    context:this
                })
                break;
            default :
                this.model.hitOrMiss(enemyModel, options)
        }

    },
    hitForward:function(heroModel, enemyModel){
        //TODO animation
        var p = currentRoomSprite.getDrawPosition(getIncrementPosition(heroModel.getPosition(), heroModel.get("face")));
        this.runAction(cc.sequence(
            cc.moveTo(times.enemyAttack, p.x, p.y ),
            cc.callFunc(function(){
                this.model.afterHit(enemyModel);
            },this)
        ))

    },
    hitMoveBack:function(heroModel, enemyModel){
        var p = currentRoomSprite.getDrawPosition(heroModel.getPosition())
        this.runAction(cc.sequence(
            cc.moveTo(times.heroAttack, p.x, p.y ),
            cc.callFunc(function(){
                this.model.afterHit(enemyModel);
            },this)
        ))
    },
    miss:function(heroModel, enemyModel){
        effectIconMananger.enqueue(this, {
            icon: "miss",
            offset: {x:-20, y:-20},
            scaleX: 0.7,
            scaleY: 0.7
        });
        
        var p = currentRoomSprite.getDrawPosition(heroModel.getPosition())
        this.runAction(cc.sequence(
            cc.moveTo(times.heroAttack, p.x, p.y ),
            cc.callFunc(function(){
                this.model.afterMiss(enemyModel);
            },this)
        ))
    },
    onChangeHp:function(){
        var prevHp = this.model.previous("hp")
        var hp = this.model.get("hp")
        var diffStr = hp - prevHp;
        if ( diffStr > 0 ) {
            diffStr = "+"+diffStr;
        }
        effectIconMananger.enqueue(this, {
            icon: "icon-hp",
            text: diffStr,
            offset: {x:-20, y:-20},
            scaleX: 0.7,
            scaleY: 0.7
        });
    },
    renderDispel:function(){
        var prevDispel = this.model.previous("dispel")
        var dispel = this.model.get("dispel")
        if ( prevDispel && !dispel ) {
            if ( this.dispelSprite ) {
                this.dispelSprite.runAction(cc.sequence(cc.spawn(
                    cc.fadeOut(0.3),
                    cc.scaleTo(0.3, 0.1, 0.1)
                    ),
                    cc.callFunc(function(){
                        this.dispelSprite = null;
                    },this),
                    cc.removeSelf()
                ));
            }
        } else if ( dispel ) {
            if ( !this.dispelSprite ) {
                this.dispelSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("dispel.png"))
                this.addChild(this.dispelSprite)
                this.dispelSprite.attr({
                    opacity: 0,
                    x: dimens.tileSize.width/2,
                    y: dimens.tileSize.height/2,
                    scaleX: 0.1,
                    scaleY: 0.1
                })
                this.dispelSprite.runAction(cc.spawn(
                    cc.fadeIn(0.3),
                    cc.scaleTo(0.3, 1, 1)
                ));
            }
        }
    }
});
MOVABLE_SPRITE_MAP.normalHero = HeroSprite
