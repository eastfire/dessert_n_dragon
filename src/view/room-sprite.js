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
            var realWidth = (this.model.get("width") - 2) * dimens.tileSize.width * this.scaleX;
            var realHeight = (this.model.get("height") - 2) * dimens.tileSize.height * this.scaleY;
            this.rect = cc.rect(this.x - realWidth / 2, this.y - realHeight / 2,
                realWidth, realHeight);
        }
        return this.rect;
    },
    renderAllTile:function(){
        var totalWidth = (this.model.get("width"))*dimens.tileSize.width
        var totalHeight = (this.model.get("height"))*dimens.tileSize.height
        this.model.foreachTile(function(tileModel){
            var tileSprite = new TileSprite({
                model: tileModel
            });
            this.addChild(tileSprite)
        },this)

        var scaleRate = (cc.winSize.width - padding*2)/(totalWidth-2*dimens.tileSize.width);
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
            self.model.checkAllMovableMoved();
        }, times.step * maxStep )
    },
    renderAllMovable:function(){
        this.model.foreachMovable(function(movableModel){
            this.generateMovable(this.model, movableModel)
        },this)
    },
    generateMovable:function(roomModel, movableModel){
        var spriteClass = MOVABLE_SPRITE_MAP[movableModel.get("type")];
        if ( !spriteClass && movableModel instanceof EnemyModel ) {
            spriteClass = EnemySprite; //default enemy sprite
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
