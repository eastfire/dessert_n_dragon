var TileSprite = BaseSprite.extend({
    ctor:function(options) {
        this._super(options);

        this.attr({
            x: this.model.get("position").x * dimens.tileSize.width,
            y: this.model.get("position").y * dimens.tileSize.height,
            anchorX: 0,
            anchorY: 0
        })
    },
    getInitFrameName:function(){
        return this.model.get("type")+"-"+this.model.get("subtype")+".png"
    }
})