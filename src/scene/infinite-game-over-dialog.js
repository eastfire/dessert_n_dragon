/**
 * Created by 赢潮 on 2016/5/3.
 */
var LeanCloudStrategy = function(){
    return {
        init:function(){
            AV.initialize("t9zSqtJOBXCucVufKh1BCKIv-gzGzoHsz",
                "ix2t3REytTzx2ryJBFTbTKJo");
            this.ScoreObject = AV.Object.extend('Score');
        },
        saveScore:function(score, success, error){
            var s = this.ScoreObject.new();
            s.set(score);
            s.save({
                success:success
                error:error
            });
        },
        fetchScores:function(success,error){
            var query = new AV.Query(this.ScoreObject);
            query.addDescending('scoreValue');
//            query.addAscending('createdAt');
            query.limit(20);
            query.find({
                success:success
                error:error
            });
        }
    }
}

var currentStorageStrategy = new LeanCloudStrategy();

var InfiniteGameOverDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));
        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.isWin = options.isWin;
        this.isFirstPass = options.isFirstPass;

        currentStorageStrategy.init();

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: cc.winSize.width - 50,
            height: 700
        })

        var resultLabel = new cc.LabelTTF("您的成绩:"+this.model.get("score")+"分", null, 25 );
        resultLabel.attr({
            color: colors.gameOver.ok,
            x: this.width/2,
            y: 660,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(resultLabel);

        var retryItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    cc.director.runScene(new RoomScene({
                        roomEntry: clone(infiniteRoom),
                        maxScore: score[0]
                    }));
                });
            }, this);

        retryItem.attr({
            x: this.width/2 - 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var retryLabel = new cc.LabelTTF("再试一次", null, 25 );
        retryLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        retryItem.addChild(retryLabel);

        var okItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                this.disappear(function(){
                    cc.director.runScene(new SelectRoomScene());
                });
            }, this);

        okItem.attr({
            x: this.width/2 + 100,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var okLabel = new cc.LabelTTF("放弃", null, 25 );
        okLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        okItem.addChild(okLabel);

        retryItem.setVisible(false);
        okItem.setVisible(false);

        var textFieldBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("button-short-default.png"));
        textFieldBg.attr({
            x: this.width/2,
            y: 550
        });
        this.addChild(textFieldBg);

        var textField = new ccui.TextField();
        textField.setTouchEnabled(true);
        textField.fontName = "Arial";
        textField.fontSize = 20;
        textField.placeHolder = "请输入您的名称";
        textField.setTextColor(cc.color.BLACK);
        textField.setMaxLength(8);
        textField.setMaxLengthEnabled(true);
        textField.x = this.width/2;
        textField.y = 550 - 4;
        textField.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME:
                    textField.runAction(cc.moveBy(0.225, cc.p(0, 5)));
                    break;
                case ccui.TextField.EVENT_DETACH_WITH_IME:
                    textField.runAction(cc.moveBy(0.175, cc.p(0, -5)));
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD:
                    break;
                default:
                    break;
            }
        }, this);
        this.addChild(textField,5);

        var store = cc.sys.localStorage.getItem(APP_NAME+".playerName");
        if ( store != null ){
            textField.setString(store)
        } else {
            textField.setString("")
        }

        var self = this;
        var submitItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("button-short-default.png"),
            cc.spriteFrameCache.getSpriteFrame("button-short-press.png"),
            function () {
                var name = textField.getString();
                if ( name && name.trim() !== "" ) {
                    name = name.trim();
                    cc.sys.localStorage.setItem(APP_NAME+".playerName",name);
                    textFieldBg.setVisible(false);
                    textField.setVisible(false);
                    submitItem.setVisible(false);
                    currentStorageStrategy.saveScore({
                        name: name,
                        scoreValue: this.model.get("score"),
                        level: this.model.getHero().get("level"),
                        heroType: this.model.getHero().get("type"),
                        turnNumber: this.model.get("turnNumber"),
                        killedBy: this.model.get("killedBy")
                    },function(s){
                        self.currentScoreId = s.id;
                        currentStorageStrategy.fetchScores(function(scores){
                            self.renderScores(scores)
                        },function(){

                        })
                        okItem.setVisible(true)
                        retryItem.setVisible(true)
                    },function(){

                    })
                }
            }, this);
        submitItem.attr({
            x: this.width/2,
            y: 450,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var submitLabel = new cc.LabelTTF("提交分数", null, 25 );
        submitLabel.attr({
            color: colors.gameOver.ok,
            x: 90,
            y: 18,
            anchorX: 0.5,
            anchorY: 0.5
        });
        submitItem.addChild(submitLabel);

        var menu = new cc.Menu([okItem, retryItem, submitItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        currentRoom.blockInput();
        currentRoomSprite.stopClock();



    },
    renderScores:function(scores){
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setContentSize(cc.size(this.width - 50, this.height - 140));

        this.scrollView.x = 0;
        this.scrollView.y = 90;

        var stepY = 40;
        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height, 20 * stepY)));
        currentY = this.scrollView.getInnerContainerSize().height - stepY/2;
        cc.log(currentY)
        var found = false;
        _.each(scores,function(score){
            var text = score.get("scoreValue")+"分 "+score.get("name")+" LV"+score.get("level")+" "+
                moment(score.createdAt).locale("zh-cn").fromNow();
            var descLabel = new cc.LabelTTF(text, null, 18 );
            var labelColor = cc.color.BLACK
            if ( this.currentScoreId === score.id ) {
                found = true;
                labelColor = cc.color.RED
            }
            descLabel.attr({
                color: labelColor,
                x: 20,
                y: currentY,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(descLabel);
            currentY-=stepY;
        },this)

        this.addChild(this.scrollView)
    },
    appear:function(){
        this.runAction( cc.moveBy(times.gameOverDialog, 0, -cc.winSize.height).easing(cc.easeBounceOut())  )
    },
    disappear:function(callback){
        this.runAction(cc.sequence(
            cc.moveBy(times.gameOverDialog, 0, cc.winSize.height),
            cc.removeSelf(),
            cc.callFunc(callback,this)
        ))
    }
})
