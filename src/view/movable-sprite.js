var MovableSprite = BaseSprite.extend({
    ctor:function(options) {
        this.__animateStatus = "stand";

        this._super(options);

        this.icons = {};
        this.initLabel();
        this.initEvent();
        this.initAnimation();
    },
    getInitFrameName:function(){
        var name;
        if ( this.model.get("isAllFaceSame") ) {
            name = this.model.get("type")+(this.model.get("subtype")?("-"+this.model.get("subtype")):"")+".png"
        } else {
            name = this.model.get("type") + (this.model.get("subtype") ? ("-" + this.model.get("subtype")) : "") + this.model.get("face") + this.__animateStatus + "0.png"
        }
        cc.log(name);
        return name;
    },
    initAnimation:function(){

    },
    initEvent:function(){
        this.model.on("generate",this.generate, this)
        this.model.on("move", this.move, this)
        this.model.on("mergeTo", this.mergeTo, this)
        this.model.on("beMerged", this.beMerged, this)
        this.model.on("change:level",this.renderLevel,this)
        this.model.on("change:face",this.renderFace,this)
        this.model.on("change:frozen",this.renderStatus,this);
        this.model.on("change:angry",this.renderStatus,this);
    },
    renderFace:function(){
        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame( this.getInitFrameName() ));
    },
    renderOneStatus:function(statusName,position){
        if ( this.model.get(statusName) ) {
            if ( !this.icons[statusName] ) {
                this.icons[statusName] = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( "status-"+statusName+".png" ));
                this.icons[statusName].attr({
                    x: position.x,
                    y: position.y
                })
                this.addChild(this.icons[statusName]);
            } else {
                this.icons[statusName].attr({
                    x: position.x,
                    y: position.y
                })
            }
            position.x += dimens.statusIcon.width;
        } else {
            if ( this.icons[statusName] ) {
                this.icons[statusName].removeFromParent(true);
                this.icons[statusName] = null;
            }
        }
    },
    renderStatus:function(){
        var position =  {
            x :dimens.statusIcon.width/2,
            y : dimens.tileSize.height - dimens.statusIcon.height/2
        };
        this.renderOneStatus("frozen", position)
        this.renderOneStatus("angry", position)
    },
    initLabel:function(){
        this.levelLabel = new ccui.Text("", "Arial", dimens.levelLabel.fontSize );
        this.levelLabel.enableOutline(colors.levelLabel.outline, dimens.levelLabel.outlineWidth);
        this.levelLabel.setTextColor(colors.levelLabel.inside);
        this.levelLabel.attr({
            //color: colors.tableLabel,
            x: dimens.levelLabel.x,
            y: dimens.levelLabel.y
        });
        this.addChild(this.levelLabel);

        this.renderLevel();
    },
    renderLevel:function(){
        this.levelLabel.setVisible(this.model.get("isShowLevel"))
        this.levelLabel.setString(this.model.get("level"))
    },
    generate:function(movable){
        this.attr({
            scaleX:0.1,
            scaleY:0.1
        })
        this.runAction(cc.sequence(
            cc.scaleTo(times.generateEnemy, 1,1),
            cc.callFunc( movable.afterGenerate, movable)
        ))
    },
    move:function(movable, opt){
        var increment = INCREMENTS[opt.direction];
        this.runAction(cc.sequence(
            cc.spawn(
                //TODO ADD walk animation
                cc.moveBy(times.step * opt.step, increment.x * opt.step * dimens.tileSize.width, increment.y * opt.step * dimens.tileSize.height )
            ),
            cc.callFunc(function(){
                this.model.afterMove(opt);
            },this)
        ))
    },
    mergeTo:function(movable, targetMovable){
        //自身消失
        movable.afterMergeTo(targetMovable)
    },
    beMerged:function(movable, targetMovalbe){

    },
    standing:function(){

    },
    levelUp:function(){

    },
    rankUp:function(){

    }
})

var MOVABLE_SPRITE_MAP = {};

var VerticalLog2Sprite = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 0.75
        })
    }
});
MOVABLE_SPRITE_MAP["vertical-log2"] = VerticalLog2Sprite
