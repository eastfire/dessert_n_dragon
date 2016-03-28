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
    generateEnemy: 0.2
}

var animations = {

}

var colors = {
    levelLabel:{
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

    hpLabel:{
        x: 14,
        y: 780,
        outlineWidth: 2,
        fontSize: 22
    },
    expLabel:{
        x: 14,
        y: 750,
        outlineWidth: 2,
        fontSize: 22
    },
    scoreLabel:{
        x: 340,
        y: 780,
        outlineWidth: 2,
        fontSize: 22
    },
    turnNumberLabel:{
        x: 340,
        y: 750,
        outlineWidth: 2,
        fontSize: 22
    },
    condition:{
        y: 700,
        scale: 0.4
    },
    conditionLabel:{
        outlineWidth: 2,
        fontSize: 22
    }
}

var texts_locale = {
    zh: {

    },
    en: {

    }
}