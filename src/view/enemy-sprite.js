var EnemySprite = MovableSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.initLabel();
    },

    initEvent:function(){
        this._super()
        this.model.on("attack", this.attack, this)
        this.model.on("hit", this.hit, this)
        this.model.on("miss", this.miss, this)
        this.model.on("beHit", this.beHit, this)
        this.model.on("die", this.die, this)
    },
    initLabel:function(){
        this._super();
    },

    attack:function(enemyModel, hero){
        var heroPosition = hero.getPosition()
        var point = this.model.getClosestPoint(heroPosition)
        var deltaX = dimens.tileSize.width*(heroPosition.x - point.x )/2;
        var deltaY = dimens.tileSize.height*(heroPosition.y - point.y )/2
        //TODO animation
        this.runAction(cc.sequence(
            cc.moveBy(times.enemyAttack, deltaX, deltaY ),
            cc.callFunc(function(){
                this.model.hitOrMiss(hero)
            },this),
            cc.moveBy(times.enemyAttack, -deltaX, -deltaY ),
            cc.callFunc(function(){
                this.model.afterAttack(hero)
            },this)
        ))
    },
    hit:function(enemyModel, hero){
        //TODO animation
        this.model.afterHit(hero);
    },
    miss:function(enemyModel, hero){
        //TODO animation
        this.model.afterMiss(hero);
    },
    beHit:function(enemyModel, hero){
        //TODO animation
        this.model.afterBeHit(hero);
    },
    die:function(enemyModel, hero){
        //TODO animation
        this.model.afterDie(hero);
    }
});

MOVABLE_SPRITE_MAP.pudding = EnemySprite
MOVABLE_SPRITE_MAP.cherrycake = EnemySprite