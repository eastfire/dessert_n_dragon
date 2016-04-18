var ChoiceDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        this.options = options;
        this.model = options.model;
        this.modalLayer = options.modalLayer;
        this.level = options.level || this.model.getHero().get("level");

        this.dialogWidth = cc.winSize.width - 50
        this.attr({
            x:-cc.winSize.width/2,
            y:cc.winSize.height/2,
            width: this.dialogWidth,
            height: 650
        })

        var titleLabel = new cc.LabelTTF("嗝，吃饱了。升到第"+this.level+"级了\n请选择一个奖励", null, 25 );
        titleLabel.attr({
            color: colors.gameOver.ok,
            x: this.dialogWidth/2,
            y: 600,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(titleLabel);

        this.initMenu();

        currentRoom.blockInput();
    },
    initMenu:function(){
        this.choices = this.model.genLevelUpChoices();
        var stepY = 500/(this.choices.length+1);
        var y = 560-stepY;
        var menus = [];
        _.each(this.choices,function(choice){
            var menuItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("choice-default.png"),
                cc.spriteFrameCache.getSpriteFrame("choice-press.png"),
                function () {
                    choice.onChosen(currentRoom, choice.opt);
                    this.disappear();
                }, this);

            menuItem.attr({
                x: this.dialogWidth/2,
                y: y,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var descLabel = new cc.LabelTTF(choice.description, null, 20 );
            descLabel.attr({
                color: colors.gameOver.ok,
                x: this.dialogWidth/2,
                y: 50,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menuItem.addChild(descLabel);
            menus.push(menuItem)

            y -= stepY;
        },this);

        if ( this.model.get("rules").canRefreshChoice ) {
            var menuItem = new cc.MenuItemImage(
                cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
                cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
                function () {
                    var value = (this.model.get("refreshCount") + 1) * this.model.get("refreshCost");
                    if (gameStatus.get("money") >= value) {
                        gameStatus.set("money",gameStatus.get("money")-value);
                        gameStatus.save();
                        this.model.set("refreshCount", this.model.get("refreshCount") + 1);
                        this.menu.removeFromParent(true);
                        this.initMenu();
                    }
                }, this);

            menuItem.attr({
                x: this.dialogWidth - 100,
                y: 25,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var descLabel = new cc.LabelTTF("换一换（" + (this.model.get("refreshCount") + 1) * this.model.get("refreshCost") + "$）", null, 22);
            descLabel.attr({
                color: colors.gameOver.ok,
                x: 90,
                y: 18,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menuItem.addChild(descLabel);
            menus.push(menuItem)
        }

        this.menu = new cc.Menu(menus);
        this.menu.x = 0;
        this.menu.y = 0;
        this.addChild(this.menu);
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, cc.winSize.width, 0).easing(cc.easeBounceOut())  )
    },
    disappear:function(){
        this.model.set("refreshCount", 0);
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, cc.winSize.width, 0),
            cc.removeSelf(),
            cc.callFunc(function(){
                currentRoom.unblockInput();
                this.modalLayer.removeFromParent(true);
                if ( this.options.callback ) this.options.callback.call(this.options.context);
            },this)
        ))
    }
})