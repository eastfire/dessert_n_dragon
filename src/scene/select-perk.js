var SelectPerkLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.perks = clone(gameStatus.get("perks")) || [];
        this.perkNumber = 2;
        for ( var i = 1; i <= 3; i++ ) {
            if ( unlockedStatus.isUnlocked("perk"+i) ) {
                this.perkNumber++;
            }
        }

        var stepY = 110;

        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height-100));

        this.scrollView.x = 0;
        this.scrollView.y = 100;
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, PERK_LIST.length*stepY)));

        var currentY = this.scrollView.getInnerContainerSize().height - stepY/2

        this.addChild(this.scrollView);

        var items = [];
        _.each(PERK_LIST, function(perkName){
            //init perk item
            var menuItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("choice-default.png"),
                cc.spriteFrameCache.getSpriteFrame("choice-press.png"),
                function () {

                }, this);

            menuItem.attr({
                x: cc.winSize.width/2,
                y: currentY
            });

            //TODO icon

            var descLabel = new cc.LabelTTF(texts.perk[perkName].desc, null, 20 );
            descLabel.attr({
                color: cc.color.BLACK,
                x: 90,
                y: currentY,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(descLabel,5);

            var value = PERK_MAP[perkName].value
            var valuePointLabel = new cc.LabelTTF(value+"点", null, 20 );
            valuePointLabel.attr({
                color: value > 0 ? cc.color.RED : cc.color.BLUE,
                x: 370,
                y: currentY+20,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(valuePointLabel,5);

            menuItem.checkBox = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("checkbox-unchecked.png"))
            menuItem.checkBox.attr({
                x: 385,
                y: currentY-15
            });
            this.scrollView.addChild(menuItem.checkBox,5);

            items.push(menuItem);
            menuItem.perkName = perkName;
            this.renderMenuItem(menuItem);
            currentY-=stepY;
        },this)

        var menu = new cc.Menu(items);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        })
        this.scrollView.addChild(menu);

        this.initBottomBar();
        this.renderScoreScale()
    },
    renderMenuItem:function(){

    },
    calScoreScale:function(perkPoint){
        return Math.round((Math.log10(perkPoint) * perkPoint * 16.61)*0.5)+5
    },
    renderScoreScale:function(){
        var left = this.perkNumber - this.perks.length;
        if ( left <= 0 ) {
            this.perkLeftLabel.setVisible(false)
        } else {
            this.perkLeftLabel.setVisible(true)
            this.perkLeftLabel.setString("可选"+left+"特性")
        }

        var perkPoint = _.reduce(this.perks, function(memo, perkName){
            return memo + PERK_MAP[perkName].value;
        }, 0, this);
        if ( perkPoint === 0 ) {
            this.scoreScaleLabel.setVisible(false)
        } else if ( perkPoint > 0 ){
            this.scoreScaleLabel.setVisible(true)
            this.scoreScaleLabel.setString("总计+"+perkPoint+"点  得分修正"+(100-this.calScoreScale(perkPoint))+"%")
        } else if ( perkPoint < 0 ){
            this.scoreScaleLabel.setVisible(true)
            this.scoreScaleLabel.setString("总计"+perkPoint+"点  得分修正"+(100+this.calScoreScale(-perkPoint))+"%")
        }
    },
    initBottomBar:function(){
        var bottombar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "bottombar.png" ))
        bottombar.attr({
            x: cc.winSize.width/2,
            y: 0,
            scaleY: 2,
            anchorY: 0
        })
        this.addChild(bottombar)

        var closeItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                cc.director.popScene();
            }, this);

        closeItem.attr({
            x: cc.winSize.width/2+100,
            y: 25
        });
        var closeLabel = new cc.LabelTTF("取消", null, 22 );
        closeLabel.attr({
            color: cc.color.BLACK,
            x: 90,
            y: 18
        });
        closeItem.addChild(closeLabel);

        var okItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                //TODO save perk
                cc.director.popScene();
            }, this);

        okItem.attr({
            x: cc.winSize.width/2-100,
            y: 25
        });
        var okLabel = new cc.LabelTTF("确定", null, 22 );
        okLabel.attr({
            color: cc.color.BLACK,
            x: 90,
            y: 18
        });
        okItem.addChild(okLabel);

        var menu = new cc.Menu([closeItem,okItem]);
        this.addChild(menu,100);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY: 0
        })

        this.perkLeftLabel = new cc.LabelTTF("", null, 25 );
        this.perkLeftLabel.attr({
            color: cc.color.BLACK,
            x: 80,
            y: 70
        });
        this.addChild(this.perkLeftLabel);

        this.scoreScaleLabel = new cc.LabelTTF("", null, 25 );
        this.scoreScaleLabel.attr({
            color: cc.color.BLACK,
            x: 390,
            y: 70
        });
        this.addChild(this.scoreScaleLabel);
    },
    onEnter:function(){
        this._super();
    },
    onExit:function(){
        this._super();
    }
});

var SelectPerkScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new SelectPerkLayer();
        this.addChild(layer);
    }
});