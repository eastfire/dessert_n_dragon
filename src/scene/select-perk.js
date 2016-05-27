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

        var stepY = 90;

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
                    if ( this.isPerkSelected(perkName) ) {
                        this.unSelectPerk(perkName)
                    } else {
                        if ( this.perkNumber > this.perks.length ) {
                            this.selectPerk(perkName)
                        } else {
                            toast("只能选择"+this.perkNumber+"个特性 可去商店解锁特性数量限制",{parent:this})
                        }
                    }
                    this.renderMenuItem(menuItem)
                    this.renderScoreScale();
                }, this);

            menuItem.attr({
                x: 385,
                y: currentY,
                scaleY:0.8,
                scaleX:0.2
            });

            var bg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("choice-default.png"))
            bg.attr({
                x: cc.winSize.width/2,
                y: currentY,
                scaleY:0.8
            })
            this.scrollView.addChild(bg);
            //TODO icon

            var descLabel = new cc.LabelTTF(texts.perk[perkName].desc, null, 20 );
            descLabel.attr({
                color: cc.color.BLACK,
                x: 95,
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
    isPerkSelected:function(perkName){
        return _.contains(this.perks, perkName);
    },
    selectPerk:function(perkName){
        this.perks.push(perkName);
    },
    unSelectPerk:function(perkName){
        this.perks = _.reject(this.perks,function(name){
            return name === perkName;
        });
    },
    renderMenuItem:function(menuItem){
        if (this.isPerkSelected(menuItem.perkName) ) {
            menuItem.checkBox.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("checkbox-checked.png"));
        } else {
            menuItem.checkBox.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("checkbox-unchecked.png"));
        }
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
            this.scoreScale = 1;
        } else if ( perkPoint > 0 ){
            this.scoreScaleLabel.setVisible(true)
            this.scoreScaleLabel.setString("总计+"+perkPoint+"点  得分惩罚"+this.calScoreScale(perkPoint)+"%")
            this.scoreScaleLabel.color = cc.color.RED;
            this.scoreScale = 1-this.calScoreScale(perkPoint)*0.01;
        } else if ( perkPoint < 0 ){
            this.scoreScaleLabel.setVisible(true)
            this.scoreScaleLabel.setString("总计"+perkPoint+"点  得分奖励"+this.calScoreScale(-perkPoint)+"%")
            this.scoreScale = 1+this.calScoreScale(-perkPoint)*0.01;
            this.scoreScaleLabel.color = cc.color.BLUE;
        }
        cc.log(this.scoreScale)
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
                gameStatus.selectPerks(this.perks, this.scoreScale);
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

        this.perkLeftLabel = new cc.LabelTTF("", null, 20 );
        this.perkLeftLabel.attr({
            color: cc.color.BLACK,
            x: 80,
            y: 70
        });
        this.addChild(this.perkLeftLabel);

        this.scoreScaleLabel = new cc.LabelTTF("", null, 23 );
        this.scoreScaleLabel.attr({
            color: cc.color.BLACK,
            x: 300,
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
