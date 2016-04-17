var padding = 20;
var RoomSprite = BaseSprite.extend({
    ctor:function(options) {
        this._super(options);

        this.renderAllTile();
        this.renderAllMovable();
        this.initEvent();
    },
    getRect:function(){
        if ( !this.rect ) {
            this.rect = cc.rect(this.x - cc.winSize.width / 2, this.y - cc.winSize.width / 2,
                cc.winSize.width, cc.winSize.width);
        }
        return this.rect;
    },
    getMovableByTouchPosition:function(x,y){
        var px = Math.floor((x - (this.x - (this.model.getWidth()-2)/2*dimens.tileSize.width*this.scaleX))/(dimens.tileSize.width*this.scaleX))+1;
        var py = Math.floor((y - (this.y - (this.model.getHeight()-2)/2*dimens.tileSize.height*this.scaleX))/(dimens.tileSize.height*this.scaleX))+1;
//        cc.log("px"+px+" py"+py)
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
            var tileSprite = new TileSprite({
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
        var maxStep = this.model.shift(direction);
        var self = this;
        this.scheduleOnce(function(){
            self.model.nextPhase();
        }, times.step * maxStep )
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
        this.model.on("generate-movable",this.generateMovable, this)
    }
})
