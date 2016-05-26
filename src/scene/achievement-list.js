var AchievementLayer = cc.Layer.extend({
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

        var achievements = this.getAchievements();
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, achievements.length * stepY)));
        var currentY = this.scrollView.getInnerContainerSize().height - stepY/2;

        this.addChild(this.scrollView);

        var currentAchievements = gameStatus.get("achievements");
        var items = _.map(achievements,function(entry){
            var item = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    currentAchievements[entry.name] = currentAchievements[entry.name] || 0;
                    currentAchievements[entry.name]++;
                    gameStatus.gainMoney(entry.reward(currentAchievements[entry.name])) //saved
                    this.renderAchievement(entry);
                }, this);
            item.attr({
                x: 440,
                y: currentY
            });

            var descLabel = new cc.LabelTTF("", null, 18 );
            descLabel.attr({
                color: cc.color.WHITE,
                x: 10,
                y: currentY,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(descLabel);

            var rewardLabel = new cc.LabelTTF("", null, 18 );
            rewardLabel.attr({
                color: cc.color.BLACK,
                x: 50,
                y: 17

            });
            item.addChild(rewardLabel);

            entry.descLabel = descLabel;
            entry.menuItem = item;
            entry.rewardLabel = rewardLabel;

            this.renderAchievement(entry);

            currentY -= stepY;
            return item;
        },this)

        var menu = new cc.Menu(items);
        menu.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        })
        this.scrollView.addChild(menu);
    },
    renderAchievement:function(entry){
        var currentAchievements = gameStatus.get("achievements");
        var currentLevel = currentAchievements[entry.name] || 0;
        var showingLevel = currentLevel+1;
        var allCompleted = false;
        if ( currentLevel < entry.maxLevel ) {
            //uncompleted
            showingLevel = currentLevel+1;
        } else {
            //completed
            showingLevel = currentLevel;
            allCompleted = true;
        }

        var textEntry = texts.achievement[entry.name];
//            var name = typeof textEntry.name === "function" ? textEntry.name(showingLevel) : textEntry.name;
        var desc = typeof textEntry.desc === "function" ? textEntry.desc(showingLevel) : textEntry.desc;

        var passed = false;
        if ( entry.validation === "statistic" ){
            var requirement = entry.requirement(showingLevel)
            var current = statistic[entry.name] || 0;
            if ( current >= requirement ) {
                desc+="（已完成）"
                passed = true;
            } else {
                desc+="（"+current+"/"+requirement+"）"
            }
        }
        entry.descLabel.setString(desc);

        if ( allCompleted ) {
            entry.menuItem.setVisible(false)
        } else {
            entry.menuItem.setEnabled(passed)
            if (!passed) entry.menuItem.opacity = 129;
        }

        entry.rewardLabel.setString("领取"+entry.reward(showingLevel)+"$");
    },
    getAchievements:function(){
        var achievements = _.sortBy(_.filter(_.map(ACHIEVEMENT_ENTRY_MAP,function(value,key){
            var cloneEntry = clone(value);
            cloneEntry.reward = value.reward;
            cloneEntry.requirement = value.requirement;
            cloneEntry.name = key;
            return cloneEntry;
        },this),function(entry){
            var currentAchievements = gameStatus.get("achievements");
            var currentLevel = currentAchievements[entry.name] || 0;
            return currentLevel < entry.maxLevel;
        },this), function(value){
            return value.index;
        },this);
        return achievements
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

var AchievementScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AchievementLayer();
        this.addChild(layer);
    }
});
