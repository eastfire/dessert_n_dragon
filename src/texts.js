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
                desc: "恢复生命，等级越高效果越好。"
            },

            //enemy
            cherrycake: {
                name: "纸杯蛋糕下士",
                desc: "攻击力普通。热量一般。"
            },
            pudding:{
                name:"果冻巡逻兵",
                desc:"软绵无力的巡逻小兵。攻击力始终为1。热量极低。"
            },
            ricecake:{
                name:"年糕守卫",
                desc:"始终粘着不动。攻击力高。热量一般。"
            },
            archer:{
                name:"绿豆糕射手",
                desc:"远程攻击。攻击力低。热量一般。"
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