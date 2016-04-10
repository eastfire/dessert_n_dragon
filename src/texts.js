var texts_locale = {
    zh: {
        movable:{
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
            }
        }
    },
    en: {

    }
}