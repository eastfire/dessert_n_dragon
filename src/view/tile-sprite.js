var TileSprite = BaseSprite.extend({
    ctor:function(options) {
        this._super(options);

        this.attr({
            x: this.model.get("position").x * dimens.tileSize.width,
            y: this.model.get("position").y * dimens.tileSize.height,
            anchorX: 0,
            anchorY: 0
        })
        if ( this.model.get("cloud") ) {
            this.cloudAppear();
        }

        this.initEvent();
    },
    initEvent:function(){
        this.model.on("change:cloud", this.onCloudChange, this)
        this.model.on("changeModel", this.changeModel, this)
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
                cc.removeSelf(),
                cc.callFunc(function(){
                    this.__cloudSprite = null;
                },this)
                ));
        } else if ( !prevCloud && currentCloud ) {
            this.cloudAppear();
        }
    },
    cloudAppear:function(){
        this.scheduleOnce(function() {
            this.__cloudSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("cloud.png"));
            currentRoomSprite.addChild(this.__cloudSprite, 80);
            this.__cloudSprite.attr({
                x: this.x+this.width/2,
                y: this.y+this.height/2,
                scaleX: 0.2,
                scaleY: 0.2,
                opacity: 0
            });
            this.__cloudSprite.runAction(
                cc.spawn(
                    cc.fadeIn(times.cloud),
                    cc.scaleTo(times.cloud, this.scaleX+0.1, this.scaleY+0.1)
                )
            );
        },0.01);
    },
    changeModel:function(model){
        if ( this.__cloudSprite ) {
            this.__cloudSprite.removeFromParent(true);
            this.__cloudSprite = null;
        }
        this.model.off();
        this.model.destroy();

        this.model = model;
        this.model.on("destroy", this.onDestroy, this) //parent event
        this.initEvent();

        this.setSpriteFrame(this.model.get("type")+"-"+this.model.get("subtype")+".png") //FIXME shall change sprite
    },
    onDestroy:function(){
        if ( this.__cloudSprite ) {
            this.__cloudSprite.removeFromParent(true);
            this.__cloudSprite = null;
        }
        BaseSprite.prototype.onDestroy.call(this);
    }
})

var TILE_SPRITE_MAP = {};

TILE_SPRITE_MAP.floor = TileSprite.extend({
    ctor: function (options) {
        this._super(options);
        if ( this.isOnFloor ) {
            this.foregroundSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.model.get("type")+"-"+this.model.get("subtype")+".png"))
            this.foregroundSprite.attr({
                x: dimens.tileSize.width / 2,
                y: dimens.tileSize.height / 2
            })
            this.addChild(this.foregroundSprite);
        }
    },
    getInitFrameName:function(){
        return "floor-normal"+Math.floor(Math.random()*9.9)+".png";
    }
});

TILE_SPRITE_MAP.pit = TILE_SPRITE_MAP.floor.extend({
    isOnFloor: true
});

TILE_SPRITE_MAP.belt = TILE_SPRITE_MAP.floor.extend({
    isOnFloor: true
});

TILE_SPRITE_MAP.nail = TILE_SPRITE_MAP.floor.extend({
    isOnFloor:true,
    ctor:function(options) {
        this._super(options);
        this.model.on("attacking", this.onAttacking, this)
    },
    onAttacking:function(){
        this.foregroundSprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("nail-attacking.png"));
        this.scheduleOnce(function() {
            this.foregroundSprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("nail-normal.png"));
        }, times.teleport);
    }
})