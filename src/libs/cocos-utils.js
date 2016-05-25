var buildRichText = function( options ) {
    options = options || {};
    var richText = options.richText || new ccui.RichText();
    richText.ignoreContentAdaptWithSize(false);
    richText.width = options.width || 200;
    richText.height = options.height || 30;
    var str = options.str || options.text || "";
    var fontSize = options.fontSize || 16;
    var fontColor = options.fontColor || cc.color.WHITE;
    var fontFamily = options.fontFamily || "Arial";
    var opacity = options.opacity || 255;
    var segments = str.split(/[{|}]/);
    var tag = 1;
    _.each( segments, function(segment){
        var frame = null;
        if ( segment.substr(0,1) === "[" && segment.substr( segment.length - 1, 1) === "]" ) {
            var iconName = segment.substr(1, segment.length -2);
            frame = cc.spriteFrameCache.getSpriteFrame(iconName+".png");
        }
        if ( frame ) {
            var reimg = new ccui.RichElementImage(tag, cc.color.WHITE, 255, frame );
            richText.pushBackElement(reimg);
        } else {
            var re = new ccui.RichElementText(tag, new cc.FontDefinition({
                fillStyle: fontColor,
                fontName: fontFamily,
                fontSize: fontSize,
                fontWeight: "normal",
                fontStyle: "normal"
            }), opacity, segment);
            richText.pushBackElement(re);
        }
        tag++;
    });
    return richText;
}

var blockAllTouchEvent = function(mask){
    cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            return true;
        },
        onTouchMoved: function (touch, event) {
        },
        //Process the touch end event
        onTouchEnded: function (touch, event) {
        }
    }), mask);
}

var blockMyTouchEvent = function(mask){
    cc.eventManager.addListener(cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            //Check the click area
            if (cc.rectContainsPoint(rect, locationInNode)) {
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
        },
        //Process the touch end event
        onTouchEnded: function (touch, event) {
        }
    }), mask);
}

var ModalDialogLayer = cc.LayerColor.extend({
    ctor:function(options) {
        var options = options || {}
        this._super(options.maskColor || cc.color(0,0,0,128));

        var self = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                if ( options.clickSideCancel ) {
                    if ( self.__dialogSprite ) {
                        self.__dialogSprite.disappear()
                        self.__dialogSprite = null;
                    } else {
                        event.getCurrentTarget().removeFromParent(true)
                    }
                }
            }
        }), this);
    },
    setDialogSprite:function(dialogSprite){
        this.__dialogSprite = dialogSprite;
    }
});

var IconSprite = cc.Sprite.extend({
    ctor: function(options){
        options = options || {}
        var fontSize = options.fontSize || 30;
        var fontColor = options.fontColor || cc.color.BLACK;
        var text = options.text || "";
        var image = options.image;
        var offset = options.offset || {
            x : 48/2,
            y : 48/2-1
        }
        this._super(image);

        this.label = new ccui.Text(text, "Arial", fontSize );
        this.label.enableOutline(cc.color.WHITE, 2);
        this.label.setTextColor(fontColor);

        this.label.attr({
            x: offset.x,
            y: offset.y
        })
        this.addChild(this.label,1)
    },
    setIcon:function(image){
        if ( image instanceof cc.Texture2D )
            this.setTexture(image);
        else if ( image instanceof cc.SpriteFrame )
            this.setSpriteFrame(image);
    },
    setString:function(str){
        this.label.setString(str)
    },
    setFontColor:function(color){
        //this.label.setColor(color);
        this.label.setTextColor(color);
    }
})

var EffectIconManager = Backbone.Model.extend({
    initialize:function(options){
        this.layer = options.layer;
        this.iconZindex = options.zindex || 100;
        this.iconMap = {};
        this.queueMap = {};
    },
    enqueue:function(sprite, options){
        options = options || {};
        if ( !this.queueMap[ sprite.__instanceId ] )
            this.queueMap[sprite.__instanceId] = [];
        this.queueMap[sprite.__instanceId].push( {
            icon: options.icon,
            text: options.text || "",
            offset: options.offset || {x:0, y:0},
            scaleX: options.scaleX || 1,
            scaleY: options.scaleY || 1
        });
        this._popEffect(sprite);
    },
    fly:function(fromSprite, toSprite, options ) {
        options = options || {};
        var moveTime = options.time || 0.3;
        var fromOffset = options.fromOffset || {x:0,y:0};
        var toOffset = options.toOffset || {x:0,y:0};
        var icon = new IconSprite({
            text: options.text,
            image: cc.spriteFrameCache.getSpriteFrame(options.icon+".png")
        });
        var fromBox = fromSprite.getBoundingBoxToWorld();
        icon.attr({
            x : fromBox.x + fromSprite.width/2 + fromOffset.x,
            y : fromBox.y + fromSprite.height/2 + fromOffset.y,
            scaleX: options.scaleX || 1,
            scaleY: options.scaleY || 1,
            rotation: options.rotation || 0,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.layer.addChild( icon, this.iconZindex );

        var toBox = toSprite.getBoundingBoxToWorld();
        var sequence = cc.sequence( cc.moveTo(moveTime, toBox.x + toSprite.width/2 + toOffset.x, toBox.y + toSprite.height/2 + toOffset.y ),
            cc.callFunc(function(){
                icon.removeFromParent(true);
                if ( options.callback )
                    options.callback.call(options.context);
            },this));
        icon.runAction(sequence);
    },
    _isIconRunning:function(sprite){
        if ( this.iconMap[sprite.__instanceId] ) {
            return true;
        }
        return false;
    },
    _popEffect:function(sprite){
        if ( !this._isIconRunning(sprite) ) {
            var entry = this.queueMap[sprite.__instanceId].shift();
            if ( entry === undefined )
                return;
            this.iconMap[sprite.__instanceId] = new IconSprite({
                text: entry.text,
                image: cc.spriteFrameCache.getSpriteFrame(entry.icon+".png")
            });
            this.layer.addChild( this.iconMap[sprite.__instanceId], this.iconZindex );

            var box = sprite.getBoundingBoxToWorld();
            this.iconMap[sprite.__instanceId].attr({
                x: box.x+sprite.width/2 + entry.offset.x,
                y: box.y+sprite.height/2 + entry.offset.y,
                scaleX: entry.scaleX,
                scaleY: entry.scaleY
            })
            var sequence = cc.sequence( cc.moveBy( 0.35, 0, 35),
                cc.callFunc(function(){
                    this.iconMap[sprite.__instanceId].removeFromParent(true);
                    this.iconMap[sprite.__instanceId] = null;
                    this._popEffect(sprite);
                },this));
            this.iconMap[sprite.__instanceId].runAction(sequence);
        }
    }
})

var HookManager = Backbone.Model.extend({
    initialize:function(){
        this.__targetMap = {};

    },
    registerHook:function(timing, modelId, callback, context, params){
        this.__targetMap[timing] = this.__targetMap[timing] || [];
        var timingMap = this.__targetMap[timing];
        var entry = {
            modelId: modelId,
            callback: callback,
            context: context,
            params: params
        }
        timingMap.push(entry);
    },
    registerOnce:function(timing, modelId, callback, context, params){
        var entry = this.registerHook(timing, modelId, callback, context, params)
        entry.once = true;
    },
    removeHook:function(timing, modelId){
        var timingMap = this.__targetMap[timing] || [];
        this.__targetMap[timing] = _.reject(timingMap,function(value){
            return value.modelId == modelId;
        })
    },
    callAllHook:function(timing, extraParams){
        this.__targetMap[timing] = this.__targetMap[timing] || {};
        var timingMap = this.__targetMap[timing];
        _.each(timingMap, function(value){
            if ( value.callback ) {
                value.callback.call(value.context, value.params, extraParams);
            }
        })
        this.__targetMap[timing] = _.reject(timingMap,function(value){
            return value.once;
        })
    },
    callTargetHook:function(timing,modelId, extraParams){
        this.__targetMap[timing] = this.__targetMap[timing] || {};
        var timingMap = this.__targetMap[timing];
        _.each(timingMap, function(value){
            if ( value.modelId == modelId && value.callback ) {
                value.callback.call(value.context, value.params, extraParams);
            }
        })
        this.__targetMap[timing] = _.reject(timingMap,function(value){
            return value.modelId == modelId && value.once;
        })
    }
});

var toast = function(text, options){
    options = options || {};
    var parent = options.parent;
    var label = new ccui.Text(text, options.fontFamily || "Arial", options.fontSize || 24 );
    label.enableOutline(options.outlineColor || cc.color.BLACK, options.outlineWidth || 2 );
    label.setTextColor(options.insideColor || cc.color.WHITE);
    label.attr({
        //color: colors.tableLabel,
        x: parent.width/2,
        y: parent.height/2
    });
    parent.addChild(label);

    label.runAction(cc.sequence(
        cc.moveBy(0.4, 0, options.deltaY || 20),
        cc.fadeOut(0.1),
        cc.removeSelf()
    ))
}