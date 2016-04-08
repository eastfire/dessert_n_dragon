var CardSprite = BaseSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.setName(this.model.cid);
    },
    getInitFrameName:function(){
        return "card-"+this.model.get("type")+".png";
    }
});