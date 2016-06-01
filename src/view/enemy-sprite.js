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
        this.model.on("change:baseAttack", this.onAttackChange,this)
        this.renderAttack();
    },
    initLabel:function(){
        this._super();
    },
    renderAttack:function(){
        if ( this.attackLabel ) this.attackLabel.removeFromParent(true);
        this.attackLabel = new ccui.Text(this.model.getAttackPoint(), "Arial", dimens.levelLabel.fontSize );
        this.attackLabel.enableOutline(colors.levelLabel.outline, dimens.levelLabel.outlineWidth);
        this.attackLabel.setTextColor(colors.attackLabel.inside);
        this.attackLabel.attr(this.getAttackLabelPosition());
        this.addChild(this.attackLabel);
    },
    getAttackLabelPosition:function(){
        return {
            x: dimens.attackLabel.x,
            y: dimens.attackLabel.y
        }
    },
    onAttackChange:function(){
        this.renderAttack();
        this.attackLabel.stopAllActions()
        this.attackLabel.runAction(cc.sequence(
            cc.scaleTo(0.15, 2, 2),
            cc.scaleTo(0.1, 1, 1)
        ))
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
        this.scheduleOnce(function(){
            this.model.afterHit(hero);
        },times.enemyAttack/2);
    },
    miss:function(enemyModel, hero){
        effectIconMananger.enqueue(this, {
            icon: "miss",
            offset: {x:-20, y:-20},
            scaleX: 0.7,
            scaleY: 0.7
        });
        
        this.model.afterMiss(hero);
    },
    beHit:function(enemyModel, hero){
        var heroPosition = hero.getPosition()
        var point = this.model.getClosestPoint(heroPosition)
        var deltaX = dimens.tileSize.width*(Math.max(-1,Math.min(1,heroPosition.x - point.x)) )/4;
        var deltaY = dimens.tileSize.height*(Math.max(-1,Math.min(1,heroPosition.y - point.y)) )/4

        this.runAction(cc.sequence(
            cc.moveBy(times.heroAttack, -deltaX, -deltaY ),
            cc.callFunc(function(){
                this.model.afterBeHit(hero);
            },this),
            cc.moveBy(times.heroAttack, deltaX, deltaY )
        ))
    },
    die:function(enemyModel, hero){
        //TODO animation
        this.model.afterDie(hero);
    }
});

MOVABLE_SPRITE_MAP.prjector = EnemySprite.extend({
    attack:function(enemyModel, hero){
        var heroPosition = hero.getPosition()
        var point = this.model.getClosestPoint(heroPosition)
        var deltaX = dimens.tileSize.width*(Math.max(-1,Math.min(1,heroPosition.x - point.x)) )/3;
        var deltaY = dimens.tileSize.height*(Math.max(-1,Math.min(1,heroPosition.y - point.y)) )/3
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
    }
});

MOVABLE_SPRITE_MAP.eggroll = MOVABLE_SPRITE_MAP.archer = MOVABLE_SPRITE_MAP.prjector.extend({
    attack:function(enemyModel, hero){
        MOVABLE_SPRITE_MAP.prjector.prototype.attack.call(this,enemyModel,hero);
        var heroPosition = hero.getPosition()
        var point = this.model.getClosestPoint(heroPosition)
        var targetSprite = currentRoomSprite.getChildByName(hero.cid)
        var rotation = Math.atan2(-targetSprite.y+this.y,targetSprite.x-this.x) * 180/3.14159
        effectIconMananger.fly(this, targetSprite , {
            icon:"arrow",
//            scaleX: 0.5,
//            scaleY: 0.5,
            rotation: rotation,
            fromOffset:{
                x: -23,
                y: -23
            },
            toOffset:{
                x: -23,
                y: -23
            },
            time: times.enemyAttack*2
        })
    }
});

MOVABLE_SPRITE_MAP.popcorn = MOVABLE_SPRITE_MAP.catapult = MOVABLE_SPRITE_MAP.prjector.extend({
    attack:function(enemyModel, hero){
        MOVABLE_SPRITE_MAP.prjector.prototype.attack.call(this,enemyModel,hero);
        var heroPosition = hero.getPosition()
        var point = this.model.getClosestPoint(heroPosition)
        effectIconMananger.fly(this, currentRoomSprite.getChildByName(hero.cid), {
            icon:"stone",
//            scaleX: 0.5,
//            scaleY: 0.5,
            fromOffset:{
                x: -23,
                y: -23
            },
            toOffset:{
                x: -23,
                y: -23
            },
            time: times.enemyAttack*2
        })
    }
});