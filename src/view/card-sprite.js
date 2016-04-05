var CardSprite = BaseSprite.extend({
    ctor: function (options) {
        this._super(options);

        this.setName(this.model.cid);
    }
});