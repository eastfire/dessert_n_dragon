COMMODITY_ENTRY_LIST = [
    {
        maxLevel: 3,
        cost: function(level){
            return Math.pow(10,level)*10;
        },
        type:function(level){
            return "hand"+(level+2);
        },
        desc:function(level){
            return texts.unlock.handLimit+"  LV"+level;
        }
    },
    {
        maxLevel: 10,
        cost: function(level){
            return Math.pow(2,level)*100;
        },
        type:function(level){
            return "initHp"+level;
        },
        desc:function(level){
            return texts.unlock.initHp+"  LV"+level;
        }
    },
    {
        maxLevel: 3,
        cost: function(level){
            return Math.pow(5,level)*80;
        },
        type:function(level){
            return "perk"+level;
        },
        desc:function(level){
            return texts.unlock.perk+"  LV"+level;
        }
    },
    {
        cost: 100,
        type:"card",
        subtype: "horizontal-fire"
    },
    {
        cost: 300,
        type: "card",
        subtype: "whirl-slash",
        unlockHint: "通过14关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "whirl-slash"
        }
    },
    {
        cost: 500,
        type:"card",
        subtype: "cross-fire",
        unlockHint: "通过28关后解锁",
        valid:{
            unlockType:"shop",
            unlockSubtype: "cross-fire"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "big-whirl-slash",
        unlockHint: "通过38关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "big-whirl-slash"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "cooldown",
        unlockHint: "通过41关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "cooldown"
        }
    },
    {
        cost: 200,
        type: "card",
        subtype: "freeze",
        unlockHint: "通过45关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "freeze"
        }
    },
    {
        cost: 300,
        type: "card",
        subtype: "teleport",
        unlockHint: "通过49关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "teleport"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "tornado",
        unlockHint: "通过65关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "tornado"
        }
    },
    {
        cost: 1500,
        type: "card",
        subtype: "meteor-shower",
        unlockHint: "通过72关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "meteor-shower"
        }
    },
    {
        cost: 500,
        type: "card",
        subtype: "collector",
        unlockHint: "通过78关后解锁",
        valid: {
            unlockType: "shop",
            unlockSubtype: "collector"
        }
    },
]
