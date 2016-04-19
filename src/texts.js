var texts_locale = {
    zh: {
        movable:{
            //neutral
            pillar: {
                name: "柱子",
                desc: "不可通过。"
            },

            //item
            potion: {
                name: "回复药",
                desc: "恢复生命。\n等级越高效果越好。"
            },

            //enemy
            cherrycake: {
                name: "纸杯蛋糕下士",
                desc: "攻击力一般。\n热量一般。"
            },
            pudding:{
                name:"果冻巡逻兵",
                desc:"软绵无力的巡逻小兵。\n攻击力始终为1。\n热量极低。"
            },
            ricecake:{
                name:"年糕守卫",
                desc:"始终粘着不动。\n攻击力高。\n热量一般。"
            },
            archer:{
                name:"豌豆糕射手",
                desc:"远程攻击。\n攻击力低。\n热量一般。"
            },
            icecream: {
                name:"冰激凌法师",
                desc:"合并或攻击时有一定概率冰冻周围角色（等级越高概率越高）。\n攻击力一般。\n热量一般。\n\n他的法师帽戴反了吗？"
            },
            creampuff: {
                name:"奶油泡芙酋长",
                desc:"合并时周围敌人变得愤怒（攻击力加倍）。\n攻击力一般。\n热量一般。 \n(Buff by Puff)"
            },
            souffle: {
                name:"蛋奶酥祭祀",
                desc:"合并时自己和周围敌人升级。\n攻击力一般。\n热量一般。"
            }
        },
        card:{
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
            }
        }
    },
    en: {

    }
}
