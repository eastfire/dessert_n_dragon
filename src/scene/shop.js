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
            var cost = this.getCost(entry);

            var item = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    if ( item.opacity <= 128 ) {
                        toast(entry.unlockHint, {parent: this})
                    } else {
                        var cost = this.getCost(entry)
                        if (cost <= gameStatus.get("money")) {
                            if ( entry.maxLevel > 1 ) {
                                unlockedStatus.unlock(entry.type(this.getCurrentLevel(entry)))
                                if ( this.getCurrentLevel(entry) > 0 ) {
                                    itemName.setString(this.getDesc(entry));
                                    costLabel.setString("-"+this.getCost(entry)+"$")
                                } else {
                                    item.setVisible(false);
                                }
                            } else {
                                unlockedStatus.unlock(entry.type, entry.subtype)
                                item.setVisible(false);
                            }
                            gameStatus.useMoney(cost);
                        } else {
                            toast("$不足", {parent: this})
                        }
                    }
                }, this);

            item.attr({
                x: 440,
                y: currentY,
                anchorY: 0.5
            });

            var text = this.getDesc(entry);

            /*var isValid;
            if ( entry.valid ) {
                isValid = unlockedStatus.isUnlocked(entry.valid.unlockType, entry.valid.unlockSubtype);
            } else {
                isValid = true;
            }*/
            var isValid = true;
//            item.setEnabled( isValid )
            if ( !isValid ) {
                text+="(未解锁)"
                item.opacity = 128;
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

            var costLabel = new cc.LabelTTF("-"+cost+"$", null, 22 );
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
    getCurrentLevel:function(entry){
        var currentLevel = 1;
        for ( ;currentLevel <= entry.maxLevel; currentLevel++ ) {
            if ( !unlockedStatus.isUnlocked(entry.type(currentLevel))) {
                break;
            }
        }
        if ( currentLevel > entry.maxLevel) return -1;
        return currentLevel;
    },
    getCost:function(entry){
        if ( entry.maxLevel > 1 ) {
            var currentLevel = this.getCurrentLevel(entry);
            return entry.cost(currentLevel);
        } else {
            return entry.cost;
        }
    },
    getDesc:function(entry){
        if ( entry.desc ) {
            if ( typeof entry.desc === "string" ) return entry.desc;
            var currentLevel = this.getCurrentLevel(entry);
            return entry.desc(currentLevel);
        } else {
            if ( entry.type === "card") {
                return texts.unlock.card[entry.subtype]
            } else {
                return texts.unlock[entry.type]
            }
        }
    },
    checkValid:function(entry){
        if ( entry.maxLevel > 1 ) {
            return this.getCurrentLevel(entry) > 0;
        } else {
            if ( entry.type === "card" ) {
                return !unlockedStatus.isUnlocked(entry.type, entry.subtype)
            } else {
                return !unlockedStatus.isUnlocked(entry.type)
            }
            return true;
        }
    },
    getCommodities:function(){
        return _.filter(COMMODITY_ENTRY_LIST,function(entry){
            return this.checkValid(entry)
        },this)
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
                cc.director.popScene();
            }, this);

        closeItem.attr({
            x: dimens.closeItem.x,
            y: dimens.closeItem.y,
            scaleX: 1.2,
            scaleY: 1.2,
            anchorX: 1,
            anchorY: 0.85
        });

        var menu = new cc.Menu([closeItem]);
        this.addChild(menu,200);
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
