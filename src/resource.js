var res = {
    game_plist : "res/game.plist",
    game_png : "res/game.png",
    card_plist : "res/card.plist",
    card_png : "res/card.png"
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
    },
    deckLabel:{
        outline: cc.color.BLACK,
        inside: cc.color.WHITE
    },
    card: {
        waitLabel: {
            outline: cc.color.BLACK,
            inside: cc.color.WHITE
        },
        levelLabel: {
            outline: cc.color.BLACK,
            inside: cc.color.WHITE
        }
    },
    movableInfo:{
        levelLabel:{
            outline: cc.color.BLACK,
            inside: cc.color.WHITE
        },
        descLabel:{
            inside: cc.color.BLACK
        },
        nameLabel:{
            outline: cc.color.BLACK,
            inside: cc.color.WHITE
        }
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
    deckIcon:{
        x: 22,
        y: 150
    },
    deckLabel:{
        outlineWidth: 2,
        fontSize: 22
    },
    card_size:{
        width: 120,
        height: 168
    },
    card: {
        waitIcon: {
            x: 13,
            y: 155
        },
        waitLabel: {
            x: 33,
            y: 155,
            outlineWidth: 2,
            fontSize: 24
        },
        levelIcon: {
            x: 13,
            y: 13
        },
        levelLabel: {
            x: 13,
            y: 13,
            outlineWidth: 2,
            fontSize: 24
        }
    },
    hand_line_card_padding: 0,
    movableInfo:{
        nameLabel:{
            x: 260,
            y: 340,
            fontSize: 28,
            outlineWidth: 2
        },
        descLabel:{
            x: 260,
            y: 300,
            boundingWidth: 220,
            fontSize: 22,
            outlineWidth: 2
        },
        portrait:{
            x: 80,
            y: 320
        },
        levelLabel:{
            x: 80,
            y: 250,
            fontSize: 20,
            outlineWidth: 2
        }
    }
}

