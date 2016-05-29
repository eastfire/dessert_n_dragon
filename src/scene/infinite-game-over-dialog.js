/**
 * Created by 赢潮 on 2016/5/3.
 */
var TOP_SCORE_NUMBER = 20;

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
                success:success,
                error:error
            });
        },
        fetchScores:function(success,error){
            var query = new AV.Query(this.ScoreObject);
            query.addDescending('scoreValue');
//            query.addAscending('createdAt');
            query.limit(TOP_SCORE_NUMBER);
            query.find({
                success:success,
                error:error
            });
        }
    }
}

var currentStorageStrategy = new LeanCloudStrategy();

var InfiniteGameOverDialog = cc.Scale9Sprite.extend({
    ctor:function (options) {
        this._super(cc.spriteFrameCache.getSpriteFrame("game-over-dialog.png"));

        clearRoom();

        this.model = options.model;
        this.modalLayer = options.modalLayer;

        this.isWin = options.isWin;
        this.isFirstPass = options.isFirstPass;

        currentStorageStrategy.init();

        this.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height*3/2,
            width: cc.winSize.width - 20,
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
                        perks:gameStatus.get("perks"),
                        scoreScale:gameStatus.get("scoreScale"),
                        killedBy: this.model.getHero().get("killedBy")
                    },function(s){
                        self.currentScoreObject = s;
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
        this.scrollView.setContentSize(cc.size(this.width - 20, this.height - 140));

        this.scrollView.x = 0;
        this.scrollView.y = 90;

        var stepY = 40;
        var needExtraScoreEntry = false;
        if (this.currentScoreObject) {
            needExtraScoreEntry = _.every(scores,function(score){
                return this.currentScoreObject.id !== score.id
            },this);
        }

        this.scrollView.setInnerContainerSize(cc.size(this.scrollView.width, Math.max(this.scrollView.height,
                ( needExtraScoreEntry ? TOP_SCORE_NUMBER + 2 : TOP_SCORE_NUMBER ) * stepY)));
        this.currentY = this.scrollView.getInnerContainerSize().height - stepY/2;

        _.each(scores,function(score){
            this.renderScoreEntry(score);
            this.currentY-=stepY;
        },this)

        if ( needExtraScoreEntry ) {
            var descLabel = new cc.LabelTTF("……", null, 18 );
            descLabel.attr({
                color: cc.color.BLACK,
                x: 20,
                y: this.currentY,
                anchorX: 0,
                anchorY: 0.5
            });
            this.scrollView.addChild(descLabel);
            this.currentY-=stepY;
            this.renderScoreEntry(this.currentScoreObject);
        }

        this.addChild(this.scrollView)
    },
    renderScoreEntry:function(score){
        var text = score.get("scoreValue")+"分 "+score.get("name")+" lv"+score.get("level")+" "+score.get("turnNumber")+"回合 "+
            moment(score.createdAt).locale("zh-cn").fromNow();
        var descLabel = new cc.LabelTTF(text, null, 18 );
        var labelColor = cc.color.BLACK
        if ( this.currentScoreObject && this.currentScoreObject.id === score.id ) {
            labelColor = cc.color.RED
        }
        descLabel.attr({
            color: labelColor,
            x: 20,
            y: this.currentY,
            anchorX: 0,
            anchorY: 0.5
        });
        this.scrollView.addChild(descLabel);

        cc.log(score)
        var killedBy = score.get("killedBy");
        if ( killedBy ) {
            cc.log("aaa")
            var killerImageName;
            cc.log("aaa1")
            if ( killedBy.category === "enemy" ) {
                var killedByLevel = new cc.LabelTTF("lv" + killedBy.level, null, 16);
                killedByLevel.attr({
                    color: labelColor,
                    x: 375,
                    y: this.currentY,
                    anchorX: 1,
                    anchorY: 0.5
                });
            }
            cc.log("aaa2")
            killerImageName = killedBy.type+(killedBy.subtype?("-"+killedBy.subtype):"")+".png";
            var killerImage = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( killerImageName ))
            killerImage.attr({
                x: 390,
                y: this.currentY,
                scaleX: 0.25,
                scaleY: 0.25
            })
            cc.log("aaa3")
            this.scrollView.addChild(killedByLevel);
            this.scrollView.addChild(killerImage);

            //TODO render perks
        }
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
