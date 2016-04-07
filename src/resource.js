var res = {
    game_plist : "res/game.plist",
    game_png : "res/game.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var times = {
    step : 0.12,
    merge: 0.12,

    heroAttack: 0.15,
    enemyAttack: 0.15,
    generateEnemy: 0.2,

    gameOverDialog: 0.5,
    scoreBar: 0.1,

    card_sort: 0.3
}

var animations = {

}

var colors = {
    levelLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },

    moneyLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },

    hpLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    expLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    scoreLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    turnNumberLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    conditionLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    gameOver:{
        ok: cc.color.BLACK
    }
}

var dimens = {
    tileSize: {
        width: 120,
        height:120
    },

    levelLabel:{
        x: 14,
        y: 14,
        outlineWidth: 2,
        fontSize: 28
    },

    moneyLabel:{
        x: 64,
        y: 785,
        outlineWidth: 2,
        fontSize: 18
    },
    hpLabel:{
        x: 64,
        y: 780,
        outlineWidth: 2,
        fontSize: 22
    },
    expLabel:{
        x: 64,
        y: 750,
        outlineWidth: 2,
        fontSize: 22
    },
    scoreLabel:{
        x: 300,
        y: 780,
        outlineWidth: 2,
        fontSize: 22
    },
    turnNumberLabel:{
        x: 360,
        y: 700,
        outlineWidth: 2,
        fontSize: 22
    },
    condition:{
        y: 650,
        scale: 0.4
    },
    conditionLabel:{
        outlineWidth: 2,
        fontSize: 22
    },
    scoreBar:{
        x: 244,
        y: 750,
        width: 150,
        resWidth: 5
    },
    scoreBarFG:{
        x: 240,
        y: 750
    },
    hands:{
        y: 100
    },
    card_size:{
        width: 120,
        height: 168
    },
    hand_line_card_padding: 0,
    movableInfo:{
        nameLabel:{
            x: 250,
            y: 500,
            fontSize: 24,
            outlineWidth: 2
        },
        descLabel:{
            x: 120,
            y: 450,
            fontSize: 24,
            outlineWidth: 2
        },
        portrait:{
            x: 80,
            y: 450
        },
        levelLabel:{
            x: 80,
            y: 250,
            fontSize: 20,
            outlineWidth: 2
        }
    }
}

var texts_locale = {
    zh: {
        movable:{
            cherrycake: {
                name: "樱桃蛋糕士兵",
                flavor: "攻击力普通"
            },
            pudding:{
                name:"布丁巡逻兵",
                flavor:"攻击力始终为1"
            },
            ricecake:{
                name:"年糕守卫",
                flavor:"始终粘着不动。攻击力高。"
            }
        }
    },
    en: {

    }
}
