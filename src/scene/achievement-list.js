var AchievementLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var currentY = 40;

        this.initMoney();

        this.initMenu();

        var stepY = 50;
        
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height - 40));

        this.scrollView.x = 0;
        this.scrollView.y = 50;
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, rooms.length * stepY+currentY)));

        this.addChild(this.scrollView);

        var firstUnpassed = 0;
        _.each(rooms,function(roomEntry){
            
        },this)

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
                cc.director.runScene(new IntroScene());
            }, this);

        closeItem.attr({
            x: cc.winSize.width - 5,
            y: cc.winSize.height - 5,
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

var AchievementScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AchievementLayer();
        this.addChild(layer);
    }
});
