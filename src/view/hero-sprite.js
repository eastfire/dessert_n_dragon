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
    },
    attack:function(heroModel, enemyModel){
        var increment = INCREMENTS[heroModel.get("face")]
        var deltaX = dimens.tileSize.width*increment.x/2;
        var deltaY = dimens.tileSize.height*increment.y/2
        //TODO animation
        this.runAction(cc.sequence(
            cc.moveBy(times.heroAttack, deltaX, deltaY ),
            cc.callFunc(function(){
                this.model.hitOrMiss(enemyModel)
            },this)
        ))
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
            cc.moveBy(times.heroAttack, p.x, p.y ),
            cc.callFunc(function(){
                this.model.afterMiss(enemyModel);
            },this)
        ))
    }
});
MOVABLE_SPRITE_MAP.normalHero = HeroSprite