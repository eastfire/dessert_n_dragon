var HeroSprite = MovableSprite.extend({
    ctor: function (options) {
        this._super(options);


    },

    initEvent:function(){
        this._super()
        this.model.on("attack", this.attack, this)
        this.model.on("hitForward", this.hitForward, this)
        this.model.on("hitMoveBack", this.hitMoveBack, this)
        this.model.on("miss", this.miss, this)
        this.model.on("change:hp", this.onChangeHp, this)
    },
    attack:function(enemyModel, options){
        switch ( options.attackAction ) {
            case "normal":
                var increment = INCREMENTS[this.model.get("face")]
                var deltaX = dimens.tileSize.width*increment.x/2;
                var deltaY = dimens.tileSize.height*increment.y/2
                //TODO animation
                this.runAction(cc.sequence(
                    cc.moveBy(times.heroAttack, deltaX, deltaY ),
                    cc.callFunc(function(){
                        this.model.hitOrMiss(enemyModel, options)
                    },this)
                ))
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
        //TODO animation
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
    }
});
MOVABLE_SPRITE_MAP.normalHero = HeroSprite