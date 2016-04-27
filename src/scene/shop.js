var ShopLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initMoney();

        this.initMenu();

        var stepY = 50;
        
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height - 40-50));

        this.scrollView.x = 0;
        this.scrollView.y = 50;
        
        var commodities = this.getCommondities()
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, commodities.length * stepY+currentY)));

        this.addChild(this.scrollView);
    },
    
    initMoney:function(){
        this.moneyLabel = new ccui.Text("", "Arial", dimens.moneyLabel.fontSize );
        this.moneyLabel.enableOutline(colors.moneyLabel.outline, dimens.moneyLabel.outlineWidth);
        this.moneyLabel.setTextColor(colors.moneyLabel.inside);
        this.moneyLabel.attr({
            //color: colors.tableLabel,
            x: dimens.moneyLabel.x,
            y: dimens.moneyLabel.y,
            anchorX: 0
        });
        this.addChild(this.moneyLabel);

        var icon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "icon-money.png" ))
        icon.attr({
            //color: colors.tableLabel,
            x: dimens.moneyLabel.x - 15,
            y: dimens.moneyLabel.y,
            scaleX: 0.5,
            scaleY: 0.5
        });
        this.addChild(icon);
        this.renderMoney();
    },
    initMenu:function(){
        var closeItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("close-default.png"),
            cc.spriteFrameCache.getSpriteFrame("close-press.png"),
            function () {
                cc.director.runScene(new SelectRoomScene());
            }, this);

        closeItem.attr({
            x: dimens.closeItem.x,
            y: dimens.closeItem.y,
            anchorX: 1,
            anchorY: 1
        });

        var menu = new cc.Menu([closeItem]);
        this.addChild(menu);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY: 0
        })
        if ( !unlockedStatus.isUnlocked("infinite") ) {
            infiniteItem.opacity = 128;
            infiniteItem.setEnabled(false);
        }
    },
    renderMoney:function(){
        this.moneyLabel.setString(gameStatus.get("money"));
    },
    onEnter:function(){
        this._super();
        gameStatus.on("change:money",this.renderMoney,this)
    },
    onExit:function(){
        gameStatus.off("change:money")
        this._super();
    }
});


var ShopScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new ShopLayer();
        this.addChild(layer);
    }
});
