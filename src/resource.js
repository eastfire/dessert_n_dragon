var res = {
    game_plist : "res/game.plist",
    game_png : "res/game.png",
    card_plist : "res/card.plist",
    card_png : "res/card.png",
    intro_png : "res/intro.png"
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

    useCard: 0.25,
    card_sort: 0.3,
    teleport: 0.4,
    cloud: 0.3
}

var animations = {

}



