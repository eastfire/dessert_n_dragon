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
                briefName:"豌豆糕",
                desc:"远程攻击。\n攻击力很低。\n饱腹度一般。\n\n是的，他的前世绝对是射手，天敌是僵尸。"
            },
            baozi: {
                name:"豆沙包封印师",
                briefName:"豆沙包",
                desc:"击中造成封魔效果（使你无法摸牌）（等级越高持续时间越长）。\n攻击力较低。\n饱腹度一般。"
            },
            "cake-roll":{
                name:"蛋糕卷猎魔者",
                briefName:"蛋糕卷",
                desc:"你的魔法攻击对他无效，且会让他升级。\n攻击力很高。\n饱腹度很高。"
            },
            candy: {
                name:"奶糖咒术师",
                briefName:"奶糖",
                desc:"击中时有一定概率使你被诅咒（下一次恢复生命量减半）（等级越高概率越高）。\n攻击力较低。\n饱腹度一般。"
            },
            cane: {
                name:"拐杖糖盗贼",
                briefName:"拐杖糖",
                desc:"周围8个格子有几个道具，攻击力就加几倍。\n攻击力一般～很高。\n饱腹度一般。"
            },
            catapult: {
                name:"琥珀核桃投石车",
                briefName:"琥珀核桃",
                desc:"远程攻击，距离你越远攻击力越高。距离1～3格内不会攻击。\n攻击力极低～很高。\n饱腹度极高。"
            },
            cherrycake: {
                name: "纸杯蛋糕下士",
                briefName:"纸杯蛋糕",
                desc: "攻击力一般。\n饱腹度一般。"
            },
            "chocolate-cake":{
                name:"黑森林武士",
                briefName:"黑森林",
                desc:"\n攻击力高。\n饱腹度高。\n\n呼～～呼"
            },
            creampuff: {
                name:"奶油泡芙酋长",
                briefName:"奶油泡芙",
                desc:"合并时周围敌人变得愤怒（攻击力加倍）。\n攻击力一般。\n饱腹度一般。\n\n(Buff by Puff)"
            },
            donut:{
                name:"甜甜圈骑士",
                briefName:"甜甜圈",
                desc:"攻击力超高。\n饱腹度超高。\n\n别被他圆圆的外表欺骗"
            },
            dumpling: {
                name:"汤圆军团",
                briefName:"汤圆",
                desc:"周围8个格子有几个其他汤圆军团，攻击力就加几倍。\n攻击力较低～很高。\n饱腹度一般。"
            },
            eggroll:{
                name:"蛋卷吹箭手",
                briefName:"蛋卷",
                desc:"远程攻击。仅当与你同一行或同一列时攻击。\n攻击力较高。\n饱腹度较高。"
            },
            icecream: {
                name:"冰激凌法师",
                briefName:"冰激凌",
                desc:"合并或攻击时有一定概率冰冻周围角色（等级越高概率越高）。\n攻击力一般。\n饱腹度一般。\n\n他的法师帽戴反了吗？"
            },
            jelly:{
                name:"果冻侦察兵",
                briefName:"果冻",
                desc:"一定概率躲过近距离攻击（等级越高概率越高）。\n攻击力很低。\n饱腹度较低。"
            },
            lolipop: {
                name:"棒棒糖兄弟",
                briefName:"棒棒糖",
                desc:"攻击时有一定概率使你的卡牌等待时间延长（等级越高概率越高，效果越明显）。\n攻击力一般。\n饱腹度一般。\n\n这就是人棒合一的境界"
            },
            mushmellow:{
                name:"棉花糖召唤师",
                briefName:"棉花糖",
                desc:"合并时召唤云朵遮挡视线（等级越高云朵越多）。\n攻击力较低。\n饱腹度较低。"
            },
            popcorn:{
                name:"爆米花掷弹兵",
                briefName:"爆米花",
                desc:"远程攻击。攻击时有一定概率造成眩晕（等级越高概率越高）。\n攻击力一般。\n饱腹度较高。"
            },
            pudding:{
                name:"布丁巡逻兵",
                briefName:"布丁核桃",
                desc:"软绵无力的巡逻小兵。\n攻击力始终为1。\n饱腹度极低。"
            },
            ricecake:{
                name:"年糕守卫",
                briefName:"年糕",
                desc:"始终粘着不动。\n攻击力较高。\n饱腹度一般。"
            },
            souffle: {
                name:"蛋奶酥祭司",
                briefName:"蛋奶酥",
                desc:"合并时自己和周围敌人升级。\n攻击力一般。\n饱腹度一般。"
            },
            "strawberry-pie":{
                name:"草莓派将军",
                briefName:"草莓派",
                desc:"击中时自己升级1级。\攻击力超高。\n饱腹度超高。"
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
                desc: "攻击上下左右4个格子的所有的敌人",
                levelUpDesc: "等待时间-1"
            },
            "big-whirl-slash":{
                name:"大回旋扫尾",
                desc: "攻击周围8个格子的所有的敌人",
                levelUpDesc: "等待时间-2"
            },
            cooldown:{
                name:"冷静",
                desc: function(level) {
                    return "手中所有牌的等待时间减" + CARD_MODEL_MAP.cooldown.getEffect();
                },
                levelUpDesc:function(level){
                    return "等待时间多减少"+CARD_MODEL_MAP.cooldown.getEffectDiff()
                }
            },
            freeze:{
                name:"冰冻",
                desc: "所有敌人不能移动1回合",
                levelUpDesc: "等待时间-1"
            },
            "meteor-shower":{
                name:"陨石雨",
                desc: function(level) {
                    return "用陨石雨随机消灭" + CARD_MODEL_MAP["meteor-shower"].getEffect()+"个敌人";
                },
                levelUpDesc:function(level){
                    return "多消灭"+CARD_MODEL_MAP["meteor-shower"].getEffectDiff()+"个敌人";
                }
            },
            teleport:{
                name:"传送",
                desc: "随机传送到另一格空的地方",
                levelUpDesc: "等待时间-1"
            },
            tornado:{
                name:"狂风",
                desc: "将所有敌人或道具随机排列",
                levelUpDesc: "等待时间-1"
            },

            //passive
            collector: {
                name:"收集",
                desc: function(level){
                    return "持续：获得道具的效果+"+CARD_MODEL_MAP.collector.getEffect(level)+"（当前"+currentRoom.getHero().get("collector")+"）\n使用时：1回合内暂时提升幸运"+CARD_MODEL_MAP.collector.getUseEffect;
                },
                levelUpDesc: function(level){
                    return "获得道具的效果多+"+CARD_MODEL_MAP.collector.getEffectDiff(level)+"（当前"+currentRoom.getHero().get("collector")+"）";
                }
            },
            constitution: {
                name:"强壮",
                desc: function(level){
                    return "持续：生命上限+"+CARD_MODEL_MAP.constitution.getEffect(level)+"\n使用时：恢复"+CARD_MODEL_MAP.constitution.getUseEffect+"点生命";
                },
                levelUpDesc: function(level){
                    return "生命上限多+"+CARD_MODEL_MAP.constitution.getEffectDiff(level);
                }
            },
            cunning: {
                name:"健身",
                desc: function(level){
                    return "持续：升级需要的饱腹度减少"+CARD_MODEL_MAP.cunning.getEffect(level)+"% 当前"+currentRoom.getHero().get("cunning")+"%\n使用时：获得"+CARD_MODEL_MAP.cunning.getUseEffect+"点饱腹度";
                },
                levelUpDesc: function(level){
                    return "升级需要的饱腹度再减少"+CARD_MODEL_MAP.cunning.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("cunning")+"%";
                }
            },
            dexterity: {
                name:"敏捷",
                desc: function(level){
                    return "被动：躲开敌人近战攻击的概率+"+CARD_MODEL_MAP.dexterity.getEffect(level)+"% 当前"+currentRoom.getHero().get("dexterity")+"%\n使用时：1回合内暂时提升敏捷"+CARD_MODEL_MAP.dexterity.getUseEffect;
                },
                levelUpDesc: function(level){
                    return "躲开敌人近战攻击的概率多+"+CARD_MODEL_MAP.dexterity.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("dexterity")+"%";
                }
            },
            dodge: {
                name:"闪躲",
                desc: function(level){
                    return "被动：躲开敌人远程攻击的概率+"+CARD_MODEL_MAP.dodge.getEffect(level)+"% 当前"+currentRoom.getHero().get("dodge")+"%\n使用时：1回合内暂时提升闪躲"+CARD_MODEL_MAP.dodge.getUseEffect;
                },
                levelUpDesc: function(level){
                    return "躲开敌人远程攻击的概率多+"+CARD_MODEL_MAP.dodge.getEffectDiff(level)+"% 当前"+currentRoom.getHero().get("dodge")+"%";
                }
            },
            luck: {
                name:"幸运",
                desc: function(level){
                    return "持续：幸运+"+CARD_MODEL_MAP.luck.getEffect(level)+"（当前"+currentRoom.getHero().get("luck")+"）\n使用时：1回合内暂时提升幸运"+CARD_MODEL_MAP.luck.getUseEffect;
                },
                levelUpDesc: function(level){
                    return "幸运多+"+CARD_MODEL_MAP.luck.getEffectDiff(level)+"（当前"+currentRoom.getHero().get("luck")+"）";
                }
            },
            recovery: {
                name:"恢复",
                desc: function(level){
                    return "被动：升级时多恢复"+CARD_MODEL_MAP.recovery.getEffect(level)+"%生命 当前"+currentRoom.getHero().get("recovery")+"%\n使用时：恢复"+CARD_MODEL_MAP.recovery.getUseEffect+"点生命";;
                },
                levelUpDesc: function(level){
                    return "升级时再多恢复"+CARD_MODEL_MAP.recovery.getEffectDiff(level)+"%生命 当前"+currentRoom.getHero().get("recovery")+"%";
                }
            }
        },

        unlock:{
            "infinite":"你解锁了无尽关卡",
            "shop-entry":"你可以访问商店解锁新技能",
            //shop unlock maintain in later code
            shop:{},

            handLimit: "手牌上限加１",
            initHp: "初始生命+10",
            //card unlock maintain in later code
            card:{},
            
            //enemy unlock maintain in later code
            enemy:{}
        },

        achievement:{
            "hero-die": {
                name:function(level){
                    return "百折不挠"+LEVEL_TEXT_MAP[level];
                },
                desc: function (level) {
                    return "失去所有生命" + ACHIEVEMENT_ENTRY_MAP["hero-die"].requirement(level) + "次"
                }
            }
        }
    },
    en: {

    }
}

texts_locale.zh.movable["vertical-log7"]=texts_locale.zh.movable["vertical-log6"]=texts_locale.zh.movable["vertical-log5"]=texts_locale.zh.movable["vertical-log4"]=texts_locale.zh.movable["vertical-log3"]=texts_locale.zh.movable["vertical-log2"]
texts_locale.zh.movable["horizontal-log7"]=texts_locale.zh.movable["horizontal-log6"]=texts_locale.zh.movable["horizontal-log5"]=texts_locale.zh.movable["horizontal-log4"]=texts_locale.zh.movable["horizontal-log3"]=texts_locale.zh.movable["horizontal-log2"]=texts_locale.zh.movable["horizontal-log2"]

//unlock shop
_.each(["cross-fire","whirl-slash","big-whirl-slash","cooldown",
    "freeze","teleport","tornado","meteor-shower","collector"],function(cardName){
    texts_locale.zh.unlock.shop[cardName] = texts_locale.zh.card[cardName].name+"可以在商店中解锁了"
})

//unlock card
_.each(["vertical-fire","horizontal-fire","cross-fire","whirl-slash","big-whirl-slash","cooldown",
    "freeze","teleport","tornado","meteor-shower","collector"],function(cardName){
    texts_locale.zh.unlock.card[cardName] = "在任意关卡中使用"+texts_locale.zh.card[cardName].name+"技能"
})

//unlock enemy
_.each(["baozi","cake-roll","candy","cane","catapult","chocolate-cake",
    "donut","dumpling","eggroll","jelly","lolipop","mushmellow","popcorn","strawberry-pie"],function(enemyName){
    texts_locale.zh.unlock.enemy[enemyName] = texts_locale.zh.movable[enemyName].name+"将在无尽关卡中出现"
})

//kill achievement
_.each(["archer","baozi","cake-roll","candy","cane","catapult","cherrycake","chocolate-cake","creampuff",
    "donut","dumpling","eggroll","icecream","jelly","lolipop","mushmellow","popcorn","pudding","ricecake","souffle","strawberry-pie"],function(enemyName){
    texts_locale.zh.achievement["kill-level-"+enemyName] = {
        name:function(level){
            return texts_locale.zh.movable[enemyName].briefName+"杀手"+LEVEL_TEXT_MAP[level];
        },
        desc: function (level) {
            return "吃掉总等级" + ACHIEVEMENT_ENTRY_MAP["kill-level-"+enemyName].requirement(level) + "的"+texts_locale.zh.movable[enemyName].name
        }
    }
    texts_locale.zh.achievement["kill-max-level-"+enemyName] = {
        name:function(level){
            return texts_locale.zh.movable[enemyName].briefName+"杀手"+LEVEL_TEXT_MAP[level];
        },
        desc: function (level) {
            return "吃掉等级" + ACHIEVEMENT_ENTRY_MAP["kill-max-level-"+enemyName].requirement(level) + "或以上的"+texts_locale.zh.movable[enemyName].name
        }
    }
})