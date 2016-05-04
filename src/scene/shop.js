var ShopLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initMoney();

        this.initMenu();

        var stepY = 50;
        
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height - 40));

        this.scrollView.x = 0;
        this.scrollView.y = 0;
        
        var commodities = this.getCommodities()

        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, commodities.length * stepY)));
        currentY = this.scrollView.getInnerContainerSize().height - stepY/2;

        this.addChild(this.scrollView);

        var commodityItems = _.map(commodities, function(entry){
            var item = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    if ( entry.cost <= gameStatus.get("money") ) {
                        unlockedStatus.unlock(entry.type, entry.subtype)
                        gameStatus.useMoney(entry.cost);
                        item.setVisible(false);
                    }
                }, this);

            item.attr({
                x: 440,
                y: currentY,
                anchorY: 0.5
            });
            cc.log("item.y"+item.y);

            var text;
            if ( entry.type === "card") {
                text = texts.unlock.card[entry.subtype]
            }


            var isValid;
            if ( entry.valid ) {
                isValid = unlockedStatus.isUnlocked(entry.valid.unlockType, entry.valid.unlockSubtype);
            } else {
                isValid = true;
            }
            item.setEnabled( isValid )
            if ( !isValid ) {
                text+="(未解锁)"
                item.opacity = 129;
            }

            var itemName = new cc.LabelTTF(text, null, 22 );
            itemName.attr({
                color: cc.color.WHITE,
                x: 10,
                y: currentY,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(itemName);
            cc.log("itemName.y"+itemName.y);

            var costLabel = new cc.LabelTTF("-"+entry.cost+"$", null, 22 );
            costLabel.attr({
                color: cc.color.BLACK,
                x: 50,
                y: 17

            });
            item.addChild(costLabel);

            currentY -= stepY;
            return item;
        },this)

        var menu = new cc.Menu(commodityItems);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        })
        this.scrollView.addChild(menu);
    },
    getCommodities:function(){
        return _.filter(COMMODITY_ENTRY_LIST,function(entry){
            if ( entry.type === "card" ) {
                return !unlockedStatus.isUnlocked(entry.type, entry.subtype)
            }
            return true;
        })
    },
    initMoney:function(){
        var topbar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "topbar.png" ))
        topbar.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height,
            anchorY: 1
        })
        this.addChild(topbar)


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

COMMODITY_ENTRY_LIST = [
    {
        cost: 30,
        type:"card",
        subtype: "vertical-fire"
    },
    {
        cost: 100,
        type:"card",
        subtype: "horizontal-fire"
    },
    {
        cost: 500,
        type:"card",
        subtype: "cross-fire",
        valid:{
            unlockType:"shop",
            unlockSubtype: "cross-fire"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "whirl-slash",
        valid: {
            unlockType: "shop",
            unlockSubtype: "whirl-slash"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "recovery",
        valid: {
            unlockType: "shop",
            unlockSubtype: "recovery"
        }
    }
]