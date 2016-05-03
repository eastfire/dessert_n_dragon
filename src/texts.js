var LEVEL_TEXT_MAP = [
    null,"I","II","III","IV","V","VI","VII","VIII","IX","X"
]

var texts_locale = {
    zh: {
        movable:{
            //neutral
            pillar: {
                name: "柱子",
                desc: "不可通过。"
            },
            "vertical-log2": {
                name: "滚木",
                desc: "只能横向移动，不可通过。"
            },
            "horizontal-log2": {
                name: "滚木",
                desc: "只能纵向移动，不可通过。"
            },

            //item
            potion: {
                name: "回复药",
                desc: "恢复生命。\n等级越高效果越好。"
            },
            money: {
                name: "钱",
                desc: "用途你懂的。\n等级越高金额越高。"
            },

            //enemy
            archer:{
                name:"豌豆糕射手",
                desc:"远程攻击。\n攻击力低。\n饱腹度一般。\n\n是的，他的前世绝对是射手，天敌是僵尸。"
            },
            cherrycake: {
                name: "纸杯蛋糕下士",
                desc: "攻击力一般。\n饱腹度一般。"
            },
            "chocolate-cake":{
                name:"黑森林武士",
                desc:"\n攻击力高。\n饱腹度高。\n\n呼～～呼"
            },
            creampuff: {
                name:"奶油泡芙酋长",
                desc:"合并时周围敌人变得愤怒（攻击力加倍）。\n攻击力一般。\n饱腹度一般。\n\n(Buff by Puff)"
            },
            donut:{
                name:"甜甜圈骑士",
                desc:"\n攻击力超高。\n饱腹度超高。\n\n别被他圆圆的外表欺骗"
            },
            icecream: {
                name:"冰激凌法师",
                desc:"合并或攻击时有一定概率冰冻周围角色（等级越高概率越高）。\n攻击力一般。\n饱腹度一般。\n\n他的法师帽戴反了吗？"
            },
            jelly:{
                name:"果冻侦察兵",
                desc:"一定概率躲过近距离攻击（等级越高概率越高）。\n攻击力较低。\n饱腹度低。"
            },
            pudding:{
                name:"布丁巡逻兵",
                desc:"软绵无力的巡逻小兵。\n攻击力始终为1。\n饱腹度极低。"
            },
            ricecake:{
                name:"年糕守卫",
                desc:"始终粘着不动。\n攻击力高。\n饱腹度一般。"
            },
            souffle: {
                name:"蛋奶酥祭司",
                desc:"合并时自己和周围敌人升级。\n攻击力一般。\n饱腹度一般。"
            }
        },
        card:{
            //active
            heal:{
                name:"治疗",
                desc: function(level){
                    return "恢复"+CARD_MODEL_MAP.heal.getEffect(level)+"点生命。"
                },
                levelUpDesc: function(level){
                    return "多恢复5点生命(当前"+CARD_MODEL_MAP.heal.getEffect(level)+")。但等待时间+1"
                }
            },
            "tail-slash":{
                name:"扫尾",
                desc: "攻击尾部的一个敌人。",
                levelUpDesc: "但等待时间-1"
            },
            "vertical-fire":{
                name:"纵向火焰",
                desc: "用火焰攻击所在列所有的敌人",
                levelUpDesc: "等待时间-1"
            },
            "horizontal-fire":{
                name:"横向火焰",
                desc: "用火焰攻击所在行所有的敌人",
                levelUpDesc: "等待时间-1"
            },
            "cross-fire":{
                name:"十字火焰",
                desc: "用火焰攻击所在行和所在列所有的敌人",
                levelUpDesc: "等待时间-2"
            },
            "whirl-slash":{
                name:"回旋扫尾",
                desc: "攻击所在周围8个格子的所有的敌人",
                levelUpDesc: "等待时间-2"
            },

            //passive
            luck: {
                name:"幸运",
                desc: function(level){
                    return "被动：道具掉落概率+"+CARD_MODEL_MAP.luck.getEffect(level)+"% 当前"+currentRoom.getHero().get("luck")+"%";
                },
                levelUpDesc: function(level){
                    return "道具掉落概率+"+CARD_MODEL_MAP.luck.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("luck")+"%";
                }
            },
            constitution: {
                name:"强壮",
                desc: function(level){
                    return "被动：生命上限+"+CARD_MODEL_MAP.constitution.getEffect(level);
                },
                levelUpDesc: function(level){
                    return "生命上限+"+CARD_MODEL_MAP.constitution.getEffectDiff(level);
                }
            },
            cunning: {
                name:"健身",
                desc: function(level){
                    return "被动：升级需要的饱腹度减少"+CARD_MODEL_MAP.cunning.getEffect(level)+"% 当前"+currentRoom.getHero().get("cunning")+"%";
                },
                levelUpDesc: function(level){
                    return "升级需要的饱腹度减少"+CARD_MODEL_MAP.cunning.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("cunning")+"%";
                }
            },
            dexterity: {
                name:"敏捷",
                desc: function(level){
                    return "被动：躲开敌人近战攻击的概率+"+CARD_MODEL_MAP.dexterity.getEffect(level)+"% 当前"+currentRoom.getHero().get("dexterity")+"%";
                },
                levelUpDesc: function(level){
                    return "躲开敌人近战攻击的概率+"+CARD_MODEL_MAP.dexterity.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("dexterity")+"%";
                }
            },
            dodge: {
                name:"闪躲",
                desc: function(level){
                    return "被动：躲开敌人远程攻击的概率+"+CARD_MODEL_MAP.dodge.getEffect(level)+"% 当前"+currentRoom.getHero().get("dodge")+"%";
                },
                levelUpDesc: function(level){
                    return "躲开敌人远程攻击的概率+"+CARD_MODEL_MAP.dodge.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("dodge")+"%";
                }
            }
        },

        unlock:{
            "infinite":"你解锁了无尽关卡",
            "shop-entry":"你可以访问商店解锁新技能",
            shop:{
                "cross-fire":"十字火焰可以在商店中解锁了",
                "whirl-slash":"回旋扫尾可以在商店中解锁了"
            },

            //card
            card:{
                "vertical-fire":"在任意关卡中使用纵向火焰",
                "horizontal-fire":"在任意关卡中使用横向火焰",
                "cross-fire":"在任意关卡中使用十字火焰",
                "whirl-slash":"在任意关卡中使用回旋扫尾"
            },
            
            //enemy
            enemy:{
                "chocolate-cake":"黑森林武士将在无尽关卡中出现",
                "donut":"甜甜圈骑士将在无尽关卡中出现",
                "jelly":"果冻侦察兵将在无尽关卡中出现"
            }
        },

        achievement:{
            "kill-level-pudding": {
                name:function(level){
                    return "布丁杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-pudding"].requirement(level) + "的布丁巡逻兵"
                }
            },
            "kill-max-level-pudding": {
                name:function(level){
                    return "精英布丁杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-pudding"].requirement(level) + "或以上的布丁巡逻兵"
                }
            },
            "kill-level-cherrycake": {
                name:function(level){
                    return "纸杯蛋糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-cherrycake"].requirement(level) + "的纸杯蛋糕下士"
                }
            },
            "kill-max-level-cherrycake": {
                name:function(level){
                    return "精英纸杯蛋糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-cherrycake"].requirement(level) + "或以上的纸杯蛋糕下士"
                }
            },
            "kill-level-ricecake": {
                name:function(level){
                    return "年糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-ricecake"].requirement(level) + "的年糕守卫"
                }
            },
            "kill-max-level-ricecake": {
                name:function(level){
                    return "精英年糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-ricecake"].requirement(level) + "或以上的年糕守卫"
                }
            },
            "kill-level-icecream": {
                name:function(level){
                    return "冰激凌杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-icecream"].requirement(level) + "的冰激凌法师"
                }
            },
            "kill-max-level-icecream": {
                name:function(level){
                    return "精英冰激凌杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-icecream"].requirement(level) + "或以上的冰激凌法师"
                }
            },
            "kill-level-creampuff": {
                name:function(level){
                    return "奶油泡芙杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-creampuff"].requirement(level) + "的奶油泡芙酋长"
                }
            },
            "kill-max-level-creampuff": {
                name:function(level){
                    return "精英奶油泡芙杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-creampuff"].requirement(level) + "或以上的奶油泡芙酋长"
                }
            },
            "kill-level-souffle": {
                name:function(level){
                    return "蛋奶酥杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-souffle"].requirement(level) + "的蛋奶酥祭司"
                }
            },
            "kill-max-level-souffle": {
                name:function(level){
                    return "精英蛋奶酥杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-souffle"].requirement(level) + "或以上的蛋奶酥祭司"
                }
            },
            "kill-level-archer": {
                name:function(level){
                    return "豌豆糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-archer"].requirement(level) + "的豌豆糕射手"
                }
            },
            "kill-max-level-archer": {
                name:function(level){
                    return "精英豌豆糕杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-archer"].requirement(level) + "或以上的豌豆糕射手"
                }
            },
            "kill-level-chocolate-cake": {
                name:function(level){
                    return "黑森林杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-chocolate-cake"].requirement(level) + "的黑森林武士"
                }
            },
            "kill-max-level-chocolate-cake": {
                name:function(level){
                    return "精英黑森林杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-chocolate-cake"].requirement(level) + "或以上的黑森林武士"
                }
            },
            "kill-level-donut": {
                name:function(level){
                    return "甜甜圈杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-donut"].requirement(level) + "的甜甜圈骑士"
                }
            },
            "kill-max-level-donut": {
                name:function(level){
                    return "精英甜甜圈杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-donut"].requirement(level) + "或以上的甜甜圈骑士"
                }
            },
            "kill-level-jelly": {
                name:function(level){
                    return "果冻杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-jelly"].requirement(level) + "的果冻侦察兵"
                }
            },
            "kill-max-level-jelly": {
                name:function(level){
                    return "精英果冻杀手"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-jelly"].requirement(level) + "或以上的果冻侦察兵"
                }
            }
        }
    },
    en: {

    }
}

texts_locale.zh.movable["vertical-log7"]=texts_locale.zh.movable["vertical-log6"]=texts_locale.zh.movable["vertical-log5"]=texts_locale.zh.movable["vertical-log4"]=texts_locale.zh.movable["vertical-log3"]=texts_locale.zh.movable["vertical-log2"]
texts_locale.zh.movable["horizontal-log7"]=texts_locale.zh.movable["horizontal-log6"]=texts_locale.zh.movable["horizontal-log5"]=texts_locale.zh.movable["horizontal-log4"]=texts_locale.zh.movable["horizontal-log3"]=texts_locale.zh.movable["horizontal-log2"]=texts_locale.zh.movable["horizontal-log2"]
