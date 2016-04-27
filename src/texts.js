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
                desc: "用途你懂的。\n等级越高效果越好。"
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
                desc:"\n攻击力高。\n饱腹度高。"
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
            pudding:{
                name:"果冻巡逻兵",
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
                    return "恢复"+level+"点生命。"
                }
            },
            "tail-slash":{
                name:"扫尾",
                desc: "攻击尾部的一个敌人。"
            },
            "vertical-fire":{
                name:"纵向火焰",
                desc: "用火焰攻击所在列所有的敌人"
            },
            "horizontal-fire":{
                name:"横向火焰",
                desc: "用火焰攻击所在行所有的敌人"
            },
            "cross-fire":{
                name:"十字火焰",
                desc: "用火焰攻击所在行和所在列所有的敌人"
            },
            "whirl-slash":{
                name:"回旋扫尾",
                desc: "攻击所在周围8个格子的所有的敌人"
            },

            //passive
            luck: {
                name:"幸运",
                desc: "被动技能：道具掉落概率+3%"
            },
            constitution: {
                name:"强壮",
                desc: "被动技能：生命上限+10"
            }
        },
        unlock:{
            "infinite":"你解锁了无尽关卡",
            shop:{
                "horizontal-fire":"可以在商店中解锁横向火焰了"
            },

            //card
            card:{
                "horizontal-fire":"可以在无尽关卡中使用横向火焰"
            },
            
            //enemy
            enemy:{
                "chocolate-cake":"黑森林武士将在无尽关卡中出现",
                "donut":"甜甜圈骑士将在无尽关卡中出现"
            }
        }
    },
    en: {

    }
}

texts_locale.zh.movable["vertical-log7"]=texts_locale.zh.movable["vertical-log6"]=texts_locale.zh.movable["vertical-log5"]=texts_locale.zh.movable["vertical-log4"]=texts_locale.zh.movable["vertical-log3"]=texts_locale.zh.movable["vertical-log2"]
texts_locale.zh.movable["horizontal-log7"]=texts_locale.zh.movable["horizontal-log6"]=texts_locale.zh.movable["horizontal-log5"]=texts_locale.zh.movable["horizontal-log4"]=texts_locale.zh.movable["horizontal-log3"]=texts_locale.zh.movable["horizontal-log2"]=texts_locale.zh.movable["horizontal-log2"]
