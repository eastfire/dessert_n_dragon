var TileSprite = BaseSprite.extend({
    ctor:function(options) {
        this._super(options);

        this.attr({
            x: this.model.get("position").x * dimens.tileSize.width,
            y: this.model.get("position").y * dimens.tileSize.height,
            anchorX: 0,
            anchorY: 0
        })
        
        this.model.on("change:cloud", this.onCloudChange, this)
    },
    getInitFrameName:function(){
        return this.model.get("type")+"-"+this.model.get("subtype")+".png"
    },
    onCloudChange:function(){
        var prevCloud = this.model.previous("cloud");
        var currentCloud = this.model.get("cloud");
        if ( prevCloud && !currentCloud ) {
            //disappear
            this.__cloudSprite.runAction(cc.sequence(
                cc.spawn(
                    cc.fadeOut(times.cloud),
                    cc.scaleTo(times.cloud,0.2,0.2)
                    ),
                cc.removeSelf()
                ));
        } else if ( !prevCloud && currentCloud ) {
            //appear
            this.__cloudSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "cloud.png" ));
            this.addChild(this.__cloudSprite, 80);
            this.__cloudSprite.attr({
                x: this.width/2,
                y: this.height/2,
                scaleX: 0.2,
                scaleY: 0.2,
                opacity: 0
            });
            this.__cloudSprite.runAction(
                cc.spawn(
                    cc.fadeIn(times.cloud),
                    cc.scaleTo(times.cloud,1,1)
                    )
            );
        }
    }
})
