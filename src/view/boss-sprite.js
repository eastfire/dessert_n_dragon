var BossSprite = EnemySprite.extend({
    ctor: function (options) {
        this._super(options);

        this.initHpSprite();
        this.onHpChange();
    },

    initEvent: function () {
        this._super()
        this.model.on("change:hp", this.onHpChange,this)
    },
    initHpSprite:function(){
        var maxHp = this.model.get("maxHp") || 3;
        this.hpSprites = [];
        var w = dimens.tileSize.width*2 - 80;
        var stepX = w / maxHp;
        var currentX = stepX/2+40;
        for ( var i =0; i < maxHp; i++){
            var sprite = this.hpSprites[i] = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icon-hp.png"))
            sprite.attr({
                x:currentX,
                y:dimens.attackLabel.y
            })
            this.addChild(sprite)
            currentX+=stepX;
        }
    },
    onHpChange:function(){
        var maxHp = this.model.get("maxHp") || 3;
        var currentHp = this.model.get("hp");
        for ( var i =0; i < maxHp; i++){
            this.hpSprites[i].setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("icon-"+(i+1<=currentHp?"":"empty-")+"hp.png"));
        }
    },
    getAttackLabelPosition:function(){
        return {
            x: dimens.attackLabel.x+dimens.tileSize.width,
            y: dimens.attackLabel.y
        }
    }
});

MOVABLE_SPRITE_MAP["boss-hydra"] = BossSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.attr({
            anchorX: 0.25,
            anchorY: 0.75
        })
    }
})