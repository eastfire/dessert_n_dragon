var padding = 20;
var RoomSprite = BaseSprite.extend({
    ctor:function(options) {
        this._super(options);

        this.renderAllTile();
        this.renderAllMovable();
        this.initEvent();
        this.startClock();
    },
    getMovableByTouchPosition:function(x,y){
        var px = Math.floor((x - (this.x - (this.model.getWidth()-2)/2*dimens.tileSize.width*this.scaleX))/(dimens.tileSize.width*this.scaleX))+1;
        var py = Math.floor((y - (this.y - (this.model.getHeight()-2)/2*dimens.tileSize.height*this.scaleX))/(dimens.tileSize.height*this.scaleX))+1;
        if ( px >= 0 && py >= 0 ) {
            return this.model.getMovableByPosition(px,py);
        }
        return null;
    },
    renderAllTile:function(){
        var totalWidth = this.model.getWidth()*dimens.tileSize.width
        var totalHeight = this.model.getHeight()*dimens.tileSize.height
        var maxSize = Math.max(totalWidth, totalHeight)
        this.model.foreachTile(function(tileModel){
            var TileSpriteClass = TILE_SPRITE_MAP[tileModel.get("type")] || TileSprite;
            var tileSprite = new TileSpriteClass({
                model: tileModel
            });
            this.addChild(tileSprite)
        },this)

        var scaleRate = (cc.winSize.width - padding*2)/(maxSize-2*dimens.tileSize.width);
        this.attr({
            width: totalWidth,
            height: totalHeight,
            anchorX: 0.5,
            anchorY: 0.5,
            scaleX: scaleRate,
            scaleY: scaleRate
        })
    },
    shift:function(direction){
        if ( this.model.getHero().get("dizzy") ) direction = REVERSE_DIRECTIONS[direction]

        var maxStep = this.model.shift(direction);
        var self = this;
        this.scheduleOnce(function(){
            self.model.nextPhase();
        }, times.step * maxStep )
    },
    tick:function(){
        if ( this.__clockRunning ) {
            this.model.tick();
        }
    },
    startClock:function(){
        if ( this.model.get("timeLimit") ) {
            this.__clockRunning = true;
            this.schedule(this.tick, 1);
        }
    },
    stopClock:function(){
        if (this.model.get("timeLimit")) {
            this.__clockRunning = false;
            this.unschedule(this.tick);
        }
    },
    renderAllMovable:function(){
        this.model.foreachMovable(function(movableModel){
            this.generateMovable(this.model, movableModel)
        },this)
    },
    generateMovable:function(roomModel, movableModel){
        var spriteClass = MOVABLE_SPRITE_MAP[movableModel.get("type")];
        if ( !spriteClass ) {
            if ( movableModel instanceof EnemyModel ) spriteClass = EnemySprite;
            else if ( movableModel instanceof MovableModel ) spriteClass = MovableSprite;
        }
        var movableSprite = new spriteClass({
            model: movableModel
        });
        this.addChild(movableSprite)
        movableSprite.attr({
            x: (movableModel.get("positions")[0].x + 0.5)* dimens.tileSize.width,
            y: (movableModel.get("positions")[0].y + 0.5)* dimens.tileSize.height
        })
        if ( movableModel instanceof  HeroModel ) {
            this.heroSprite = movableSprite;
            movableSprite.zIndex = 5;
        }
    },
    getDrawPosition:function(x,y){
        if ( x instanceof  Object ) {
            y = x.y;
            x = x.x
        }
        return {
            x: (x + 0.5)* dimens.tileSize.width,
            y: (y + 0.5)* dimens.tileSize.height
        }
    },
    initEvent:function(){
        this.model.on("turn-start",this.onTurnStart, this)
        this.model.on("generate-movable",this.generateMovable, this)

        this.model.on("before-switch-room",this.onBeforeSwitchRoom,this);
        this.model.on("switch-room",this.onSwitchRoom,this);
    },
    onTurnStart:function(){
        this.scheduleOnce(function(){
            this.model.afterTurnStart();
        }, 0.4);
    },
    onBeforeSwitchRoom:function(){
        this.heroSprite.runAction(cc.sequence(cc.spawn(
            cc.moveBy(times.teleport/2,0,60),
            cc.scaleTo(times.teleport/2, 1, 1),
            cc.fadeOut(times.teleport)
        ),cc.callFunc(function(){
            this.model.switchRoom();
        },this)));
    },
    onSwitchRoom:function(){
        this.heroSprite.model.off(null,null,this.heroSprite);
        this.heroSprite.model = null;
        this.heroSprite.removeFromParent();
        this.renderAllTile();
        this.renderAllMovable();
        this.heroSprite.attr({
            x: (this.model.getHero().get("positions")[0].x + 0.5)* dimens.tileSize.width,
            y: (this.model.getHero().get("positions")[0].y + 0.5)* dimens.tileSize.height + 60,
            opacity: 0
        })
        this.heroSprite.runAction(cc.sequence(cc.spawn(
            cc.moveBy(times.teleport/2,0,-60),
            cc.scaleTo(times.teleport/2, 1, 1),
            cc.fadeIn(times.teleport/2)
        ),cc.callFunc(function(){
            this.onTurnStart();
        },this)))
    }
})
