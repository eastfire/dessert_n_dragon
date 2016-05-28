var MovableSprite = BaseSprite.extend({
    ctor:function(options) {
        this.__animateStatus = "stand";

        this._super(options);
        this.setName(this.model.cid);
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
        return name;
    },
    initAnimation:function(){

    },
    initEvent:function(){
        this.model.on("generate",this.generate, this)
        this.model.on("move", this.move, this)
        this.model.on("mergeTo", this.mergeTo, this)
        this.model.on("beMerged", this.beMerged, this)
        this.model.on("change:level",this.onLevelChange,this)
        this.model.on("change:face",this.renderFace,this)
        this.model.on("change:frozen",this.renderStatus,this);
        this.model.on("change:angry",this.renderStatus,this);
        this.model.on("change:dizzy",this.renderStatus,this);
        this.model.on("teleport",this.teleport,this)
        this.model.on("beltTo",this.beltTo,this)
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
                    y: position.y,
                    scaleX: 0,
                    scaleY: 0
                })
                this.addChild(this.icons[statusName]);
                this.icons[statusName].runAction(
                    cc.sequence(
                        cc.scaleTo(0.25,2,2),
                        cc.scaleTo(0.1,1,1)
                    ));
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
        this.renderOneStatus("dizzy", position)
        this.renderOneStatus("cursed", position)
    },
    teleport:function(newPosition){

        this.runAction(cc.sequence(
            cc.spawn(
                cc.moveBy(times.teleport/2,0,60),
                cc.scaleTo(times.teleport/2, 0.4, 2),
                cc.fadeOut(times.teleport)
            ),
            cc.callFunc(function(){
                this.attr({
                    x: (newPosition.x + 0.5)* dimens.tileSize.width,
                    y: (newPosition.y + 0.5)* dimens.tileSize.height+60
                })
            },this),
            cc.spawn(
                cc.moveBy(times.teleport/2,0,-60),
                cc.scaleTo(times.teleport/2, 1, 1),
                cc.fadeIn(times.teleport)
            ),
            cc.callFunc(function(){
                this.model.afterTeleport();
            },this)
        ))
    },
    beltTo:function(newPosition){
        this.runAction(cc.sequence(
            cc.moveTo(times.teleport-0.1,(newPosition.x + 0.5)* dimens.tileSize.width,(newPosition.y + 0.5)* dimens.tileSize.height),
            cc.callFunc(function(){
                //FIX ME all movable in belt shall recalculate position at same time
                this.model.afterBeltTo(newPosition);
            },this)
        ));
    },
    initLabel:function(){
//        this.levelLabel = new ccui.Text("", "Arial", dimens.levelLabel.fontSize );
//        this.levelLabel.enableOutline(colors.levelLabel.outline, dimens.levelLabel.outlineWidth);
//        this.levelLabel.setTextColor(colors.levelLabel.inside);
//        this.levelLabel.attr({
//            //color: colors.tableLabel,
//            x: dimens.levelLabel.x,
//            y: dimens.levelLabel.y
//        });
//        this.addChild(this.levelLabel);

        this.renderLevel();
    },
    onLevelChange:function(){
        this.renderLevel();
        if ( this.levelLabel ) {
            this.levelLabel.stopAllActions()
            this.levelLabel.runAction(cc.sequence(
                cc.scaleTo(0.15, 2, 2),
                cc.scaleTo(0.1, 1, 1)
            ))
        }
//        var diff = this.model.get("level")-this.model.previous("level");
//        effectIconMananger.enqueue(this, {
//            icon: "icon-level",
//            text: diff > 0 ? ("+"+diff):diff,
//            offset: {x:-20, y:-20},
//            scaleX: 0.7,
//            scaleY: 0.7
//        });
    },
    renderLevel:function(){
        if ( !this.model.get("isShowLevel") ) return;
        if ( this.levelLabel ) this.levelLabel.removeFromParent(true);
        this.levelLabel = new ccui.Text(this.model.get("level"), "Arial", dimens.levelLabel.fontSize );
        this.levelLabel.enableOutline(colors.levelLabel.outline, dimens.levelLabel.outlineWidth);
        this.levelLabel.setTextColor(colors.levelLabel.inside);
        this.levelLabel.attr({
            //color: colors.tableLabel,
            x: dimens.levelLabel.x,
            y: dimens.levelLabel.y
        });
        this.addChild(this.levelLabel);
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

MOVABLE_SPRITE_MAP["vertical-log2"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 0.75
        })
    }
});

MOVABLE_SPRITE_MAP["vertical-log3"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 5/6
        })
    }
});

MOVABLE_SPRITE_MAP["vertical-log4"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 7/8
        })
    }
});

MOVABLE_SPRITE_MAP["vertical-log5"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 9/10
        })
    }
});

MOVABLE_SPRITE_MAP["vertical-log6"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 11/12
        })
    }
});

MOVABLE_SPRITE_MAP["vertical-log7"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorY: 13/14
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log2"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/4
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log3"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/6
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log4"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/8
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log5"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/10
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log6"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/12
        })
    }
});

MOVABLE_SPRITE_MAP["horizontal-log7"] = MovableSprite.extend({
    ctor:function(options) {
        this._super(options);
        this.attr({
            anchorX: 1/14
        })
    }
});
