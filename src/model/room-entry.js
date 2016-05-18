var STANDARD_CHOICE_POOL = [
    { type:"getScore", opt:{ number:300} },
    { type:"getFullHp" },
    { type:"getRandomMove", opt:{ from:3, to:5} },
    { type:"getRandomTime", opt:{ from:10, to:20} },
    { type:"getCard", opt:{type:"heal"}},
    { type:"getCard", opt:{type:"tail-slash"}},
//    { type:"getCard", opt:{type:"vertical-fire"}},
//    { type:"getCard", opt:{type:"horizontal-fire"}},
//    { type:"getCard", opt:{type:"cross-fire"}},
//    { type:"getCard", opt:{type:"whirl-slash"}},
    { type:"reduceRandomWait", opt:{ from:4, to:6}},
    { type:"reduceAllWait"},
    { type:"levelUpCard"}
]

var STANDARD_ITEM_POOL = ["potion","money"];

var STANDARD_HERO = {
        type:"normalHero",
        positions: [{x:3,y:3}],
        maxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        } //normal, fix
};

var rooms = [];

//无尽关卡
var infiniteRoom = { 
    stageNumber: 0,
    scoreCondition: null,
    winEveryConditions:[
    ],
    loseAnyConditions:[],
    rules:{
    },
    genEnemyStrategy: [{type:"infinite", number: 2, last: 0}],
    baseEnemyPool:[{ type:"pudding", subtype:"red"},
        {type:"cherrycake"},
        {type:"ricecake"},
        {type:"icecream"},
        {type:"creampuff"},
        {type:"souffle"},
        {type:"archer"}
    ],
    enemyPool:[{
        type:"pudding", subtype:"red"
    },{
        type:"pudding", subtype:"yellow"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles: tiles5x5,
    initHero: STANDARD_HERO,
    choicePool: _.union(STANDARD_CHOICE_POOL, [
        { type:"getCard", opt:{type:"luck"}},
        { type:"getCard", opt:{type:"constitution"}},
        { type:"getCard", opt:{type:"cunning"}},
        { type:"getCard", opt:{type:"dexterity"}},
        { type:"getCard", opt:{type:"dodge"}}
    ])
};

//初始 room1
rooms.push({
    stageNumber: 1,
    turnLimit:6,
    scoreCondition: null,
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[],
    rules:{
        heroCanGetExp: false
    },
    enemyPool:[{type:"pudding", subtype:"red"},{type:"pudding", subtype:"yellow"},{type:"pudding", subtype:"blue"}],
    initTiles: tiles5x5,
    initMovables:[
        {type:"pudding",subtype:"yellow", positions: [{x:3,y:2}]},
        {type:"pudding",subtype:"red", positions: [{x:2,y:2}]},
        {type:"pudding",subtype:"blue", positions: [{x:1,y:2}]},
        {type:"pudding",subtype:"yellow", positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"red", positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"blue", positions: [{x:1,y:1}]}
    ],
    initHero: STANDARD_HERO
});

//教学杀敌数过关，分数无要求 room2
rooms.push({ 
    turnLimit:10,
    scoreCondition: null,
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[
        {type:"pudding", subtype:"red"},
        {type:"pudding", subtype:"yellow"},
        {type:"pudding", subtype:"blue"},
        {type:"pudding", subtype:"green"}
        ],
    initTiles:tiles7x4,
    initMovables:[
        {type:"pudding",subtype:"red",positions: [{x:1,y:1}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:1}]}
        ],
    initHero: STANDARD_HERO
});

//教学杀敌数过关，且有分数要求 room3
rooms.push({ 
    turnLimit:15,
    scoreCondition: [200, 400, 600],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 3
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 3
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
        heroCanGetExp: false
    },
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"blue"},
        {type:"pudding",subtype:"green"}
        ],
    initTiles:tiles6x4,
    initMovables:[
        {type:"pudding",subtype:"red",positions: [{x:1,y:1}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:1}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:1}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:1}]},
        {type:"pudding",subtype:"red",positions: [{x:1,y:2}]},
        {type:"pudding",subtype:"yellow",positions: [{x:2,y:2}]},
        {type:"pudding",subtype:"green",positions: [{x:3,y:2}]},
        {type:"pudding",subtype:"blue",positions: [{x:4,y:2}]}
        ],
    initHero: STANDARD_HERO
});

//教学获得经验和升级 room4
rooms.push({ 
    turnLimit:20,
    scoreCondition: [250, 450, 700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "green",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"blue"
    },{
        type:"pudding",subtype:"green"
    }],
    initTiles:tiles6x6Rhombus,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL,
    unlocks: ["shop-entry"]
});

//第一次要求大量杀敌 room5
rooms.push({ 
    turnLimit:24,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 4, last: 0}],
    enemyPool:[{
        type:"pudding",subtype:"red"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"blue"
    }],
    initTiles:tiles5x6ZigVertical,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现樱桃蛋糕 room6
rooms.push({ 
    turnLimit:15,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    }],
    initTiles:tiles5x5,
    initMovables:[
        {type:"cherrycake",positions: [{x:2,y:2}]},
        {type:"cherrycake",positions: [{x:4,y:2}]},
        {type:"cherrycake",positions: [{x:2,y:4}]},
        {type:"cherrycake",positions: [{x:4,y:4}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现回复药和道具掉落 room7
rooms.push({ 
    turnLimit:10,
    scoreCondition: [200, 350, 500],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x6,
    initMovables:[
        {type:"potion",positions: [{x:2,y:2}]},
        {type:"potion",positions: [{x:4,y:2}]},
        {type:"potion",positions: [{x:2,y:4}]},
        {type:"potion",positions: [{x:4,y:4}]}
    ],
    initHero: _.extend(clone(STANDARD_HERO),{hp: 10,positions: [{x:3,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//A room8 第一次时间限制
rooms.push({ 
    timeLimit:120,
    scoreCondition: [400, 700, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"red",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"yellow",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"green",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"green"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6T,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:6}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现年糕 room9
rooms.push({ 
    turnLimit:15,
    scoreCondition: [300, 500, 800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 4
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"green"},
        {type:"pudding",subtype:"blue"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initMovables:[
        {type:"ricecake",positions: [{x:2,y:2}]},
        {type:"ricecake",positions: [{x:5,y:2}]},
        {type:"ricecake",positions: [{x:2,y:5}]},
        {type:"ricecake",positions: [{x:5,y:5}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//第一次要求敌人等级　room10
rooms.push({ 
    turnLimit:30,
    scoreCondition: [1000, 2000, 3000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "green",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"blue"},
        {type:"pudding",subtype:"green"}
        ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//柱子 room11
rooms.push({ 
    turnLimit:20,
    scoreCondition: [400, 800, 1200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 5
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"ricecake"},
        {type:"cherrycake"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Cross6x4,
    initMovables:[
        {type:"pillar",subtype:"normal",positions: [{x:2,y:2}]},
        {type:"pillar",subtype:"normal",positions: [{x:5,y:2}]},
        {type:"pillar",subtype:"normal",positions: [{x:2,y:5}]},
        {type:"pillar",subtype:"normal",positions: [{x:5,y:5}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room12 大量杀敌
rooms.push({ 
    turnLimit:35,
    scoreCondition: [1000, 2000, 3000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 16
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"ricecake"},
        {type:"cherrycake"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5HRotate90,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//复杂地形要求敌人等级room13
rooms.push({ 
    turnLimit:21,
    scoreCondition: [800, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "green",
            number: 3
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"blue"},
        {type:"pudding",subtype:"green"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6UpArrow,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room14 大量杀敌
rooms.push({ 
    turnLimit:25,
    scoreCondition: [2000, 3000, 4500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "red",
            number: 20
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "yellow",
            number: 20
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 20
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[
        {type:"pudding",subtype:"red"},
        {type:"pudding",subtype:"yellow"},
        {type:"pudding",subtype:"blue"}
        ],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 4, last: 0}],
    initTiles:tiles7x7Rhombus,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL,
    initHand:[
        {type:"whirl-slash"}
    ],
    unlocks:[{type:"shop", subtype:"whirl-slash"}]
});

//room15 第一次出现法师
rooms.push({ 
    turnLimit:15,
    scoreCondition: [600, 900, 1200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"icecream"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Triangle,
    initMovables:[
        { type:"icecream", positions: [{x:1,y:7}] },
        { type:"icecream", positions: [{x:7,y:1}] },
        { type:"icecream", positions: [{x:7,y:7}] }
    ],
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room16 第一次出现creampuff
rooms.push({ 
    turnLimit:15,
    scoreCondition: [1000, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 16
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{
        type:"creampuff"
    },{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Cross6x2,
    initMovables:[
        {type:"creampuff",positions: [{x:1,y:3}]},
        {type:"creampuff",positions: [{x:2,y:3}]},
        {type:"creampuff",positions: [{x:5,y:4}]},
        {type:"creampuff",positions: [{x:6,y:4}]},
        {type:"creampuff",positions: [{x:4,y:1}]},
        {type:"creampuff",positions: [{x:4,y:2}]},
        {type:"creampuff",positions: [{x:3,y:5}]},
        {type:"creampuff",positions: [{x:3,y:6}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room17 ice and fire
rooms.push({ 
    turnLimit:28,
    scoreCondition: [1000, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{type:"creampuff"},{type:"icecream"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Whirl,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room18 第一次出现souffle
rooms.push({ 
    turnLimit:10,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    rules:{
    },
    enemyPool:[{type:"pudding",subtype:"red"},{type:"souffle"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Whirl2,
    initMovables:[
        {type:"souffle",positions: [{x:1,y:1}]},
        {type:"souffle",positions: [{x:2,y:1}]},
        {type:"souffle",positions: [{x:6,y:1}]},
        {type:"souffle",positions: [{x:6,y:2}]},
        {type:"souffle",positions: [{x:1,y:5}]},
        {type:"souffle",positions: [{x:1,y:6}]},
        {type:"souffle",positions: [{x:5,y:6}]},
        {type:"souffle",positions: [{x:6,y:6}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room19 第一次出现滚木
rooms.push({ 
    turnLimit:12,
    scoreCondition: [800, 1200, 1600],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 3
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 3
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{type:"pudding", subtype:"red"},{type:"pudding", subtype:"yellow"},{type:"pudding", subtype:"blue"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5,
    initMovables:[{
        type:"vertical-log3",subtype:"normal",
        positions:[
            {x:2,y:4},
            {x:2,y:3},
            {x:2,y:2}
        ]
    }],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room20 吃年糕啊
rooms.push({ 
    turnLimit:15,
    scoreCondition: [300, 600, 1000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"pudding",subtype:"red"},{type:"pudding",subtype:"yellow"},{type:"pudding",subtype:"green"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initMovables:[
        { type:"ricecake", positions: [{x:1,y:5}] },
        { type:"ricecake", positions: [{x:2,y:1}] },
        { type:"ricecake", positions: [{x:2,y:3}] },
        { type:"ricecake", positions: [{x:3,y:5}] },
        { type:"ricecake", positions: [{x:4,y:2}] },
        { type:"ricecake", positions: [{x:5,y:4}] },
        { type:"ricecake", positions: [{x:5,y:6}] },
        { type:"ricecake", positions: [{x:6,y:2}] }
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//第一次出现archer 对远程兵种的生存1 room21
rooms.push({ 
    turnLimit:25,
    scoreCondition: [400, 800, 1200],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{type:"cherrycake"},{type:"pudding",subtype:"yellow"},{type:"archer"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x5IO,
    initMovables:[
        { type:"archer", positions: [{x:6,y:1}] },
        { type:"archer", positions: [{x:6,y:5}] }],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:["infinite"]
});

//room22 第一次出现chocolate cake
rooms.push({
    turnLimit:18,
    scoreCondition: [1000, 1300, 1800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"cherrycake"},{type:"chocolate-cake"},{type:"pudding", subtype:"red"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles4x6,
    initMovables:[
        { type:"chocolate-cake", positions: [{x:1,y:1}] },
        { type:"chocolate-cake", positions: [{x:1,y:6}] },
        { type:"chocolate-cake", positions: [{x:4,y:1}] },
        { type:"chocolate-cake", positions: [{x:4,y:6}] }
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"chocolate-cake"}]
});

//对远程兵种的生存2 room23
rooms.push({ 
    turnLimit:20,
    scoreCondition: [500, 800, 1200],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{type:"cherrycake"},{type:"pudding",subtype:"yellow"},{type:"archer"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x5IOI,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room24 难行
rooms.push({ 
    turnLimit:30,
    scoreCondition: [800, 1500, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"cherrycake",
            number: 5
        },
        {
            conditionType:"kill-max-level",
            type:"icecream",
            number: 5
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"cherrycake"},{type:"ricecake"},{type:"icecream"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Loop,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:2}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room25 双滚木
rooms.push({
    turnLimit:18,
    scoreCondition: [1000, 1300, 1600],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "red",
            number: 4
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "yellow",
            number: 4
        },
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype: "blue",
            number: 4
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{type:"pudding", subtype:"red"},{type:"pudding", subtype:"yellow"},{type:"pudding", subtype:"blue"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initMovables:[
        {type:"vertical-log2",subtype:"normal",positions:[{x:1,y:4},{x:1,y:3}]},
        {type:"horizontal-log2",subtype:"normal",positions:[{x:3,y:6},{x:4,y:6}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//对远程兵种的生存3 room26
rooms.push({ 
    turnLimit:25,
    scoreCondition: [400, 900, 1400],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseAnyConditions:[
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"pudding",subtype:"yellow"
    },{
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Mi,
    initMovables:[
        { type:"archer", positions: [{x:1,y:1}] },
        { type:"archer", positions: [{x:1,y:6}] },
        { type:"archer", positions: [{x:6,y:1}] },
        { type:"archer", positions: [{x:6,y:6}] }
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room27 A shape stronger enemy, want high level, danger
rooms.push({ 
    turnLimit:35,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"chocolate-cake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"souffle"},{type:"creampuff"},{type:"chocolate-cake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x7A,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:6}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room28 snake
rooms.push({ 
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"archer",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"ricecake"
    },{
        type:"archer"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Snake,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:5}]}),
    initHand:[
        {type:"cross-fire"}
    ],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"shop", subtype:"cross-fire"}]
});

//room29 log in h
rooms.push({ 
    turnLimit:24,
    scoreCondition: [1400, 1800, 2200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype: "blue",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"creampuff"
    },{
        type:"icecream"
    },{
        type:"pudding", subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6H,
    initMovables:[{
        type:"horizontal-log4",subtype:"normal",
        positions:[
            {x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5}
        ]
    }],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//romm30 第一次出现 donut
rooms.push({
    turnLimit:25,
    scoreCondition: [1000, 1400, 1800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 2, last: 0}],
    initTiles:tiles5x5Loop,
    initMovables:[
        { type:"donut", positions:[{x:1,y:1}]},
        { type:"donut", positions:[{x:1,y:5}]},
        { type:"donut", positions:[{x:5,y:1}]},
        { type:"donut", positions:[{x:5,y:5}]}
    ],
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:5}]}),
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"donut"}]
});

//room31 snake
rooms.push({ 
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-level",
            type:"pudding",subtype:"green",
            number: 6
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"cherrycake"
    },{
        type:"ricecake"
    },{
        type:"pudding",subtype:"green"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x7Snake2,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:5}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room32 snake
rooms.push({
    turnLimit:25,
    scoreCondition: [600, 1000, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"souffle"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles6x5N,
    initMovables:[
        { type:"jelly", positions:[{x:1,y:1}]},
        { type:"jelly", positions:[{x:6,y:5}]}
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"jelly"}]
});

//room33 danger
rooms.push({
    turnLimit:20,
    scoreCondition: [1000, 1400, 1800],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseEveryConditions:[
        "outOfTurn",
        "notEnoughScore"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x5,
    initHero: _.extend(clone(STANDARD_HERO),{hp:50, positions: [{x:4,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room34 jelly max level
rooms.push({
    turnLimit:24,
    scoreCondition: [800, 1400, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"jelly",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"souffle"
    },{
        type:"cherrycake"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Loop2,
    initHero: _.extend(clone(STANDARD_HERO),{hp:30, positions: [{x:3,y:2}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room35 recovery skill card
rooms.push({
    turnLimit:30,
    scoreCondition: [2000, 2500, 3000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseEveryConditions:[
        "outOfTurn",
        "notEnoughScore"
    ],
    enemyPool:[{
        type:"ricecake"
    },{
        type:"donut"
    },{
        type:"chocolate-cake"
    }],
    enemyLevelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles7x7Cross7x3,
    initHero: _.extend(clone(STANDARD_HERO),{hp:30, positions: [{x:4,y:4}]}),
    choicePool:_.union(STANDARD_CHOICE_POOL,[
        { type:"getCard", opt:{type:"recovery"}}
        ]),
    unlocks: [{type:"shop", subtype:"recovery"}]
});

//room36 icecream donut
rooms.push({
    turnLimit:27,
    scoreCondition: [1500, 2000, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"icecream"
    },{
        type:"donut"
    },{
        type:"jelly"
    }],
    levelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initTiles:tiles6x5E,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room37 ricecake max level
rooms.push({
    turnLimit:27,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"ricecake",
            number: 6
        },
        {
            conditionType:"kill-max-level",
            type:"souffle",
            number: 15
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"ricecake"
    },{
        type:"souffle"
    }],
    levelPool:[1,2,3],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room38 持久战
rooms.push({ 
    turnLimit:50,
    scoreCondition: [4000, 6000, 7000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseEveryConditions:[
        "outOfTurn",
        "notEnoughScore"
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"},{type:"chocolate-cake"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6UpArrow2,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL,
    initHand:[
        {type:"big-whirl-slash"}
    ],
    unlocks:[{type:"shop", subtype:"big-whirl-slash"}]
});

//room39 L icecream and jelly
rooms.push({ 
    timeLimit:90,
    scoreCondition: [1000, 1400, 1700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"jelly"},{type:"icecream"},{type:"pudding",subtype:"blue"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6L3,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:2}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room40 D archer max-level
rooms.push({ 
    turnLimit:27,
    scoreCondition: [800, 1200, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"archer",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"jelly"
    },{
        type:"archer"
    },{
        type:"pudding",subtype:"blue"
    }],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7D,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room41 C unlock cooldown
rooms.push({ 
    turnLimit:27,
    scoreCondition: [1500, 1900, 2300],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"archer",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"archer"},{type:"icecream"},{type:"ricecake"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6C,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:3}]}),
    initHand:[ {type:"vertical-fire"}, {type:"cooldown"} ],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"shop", subtype:"cooldown"}]
});

//room42 popcorn
rooms.push({
    turnLimit:27,
    scoreCondition: [800, 1000, 1300],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"popcorn",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"popcorn"},{type:"cherrycake"},{type:"donut"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x6Loop3,
    initMovables:[
        { type:"popcorn", positions: [{x:1,y:1}] },
        { type:"popcorn", positions: [{x:6,y:6}] }
    ],
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:1,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"popcorn"}]
});

//room43 timelimit+popcorn
rooms.push({
    timeLimit:90,
    scoreCondition: [1000, 1200, 1400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"popcorn",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"popcorn"},{type:"icecream"},{type:"jelly"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles4x4,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room44 第一次出现 portal
rooms.push({
    turnLimit:30,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 16
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"chocolate-cake"},{type:"creampuff"},{type:"souffle"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x5SplitAndPortal,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room45 freeze
rooms.push({
    turnLimit:20,
    scoreCondition: [2500, 3000, 4000],
    winEveryConditions:[
        "outOfTurn"
    ],
    loseEveryConditions:[
        "outOfTurn",
        "notEnoughScore"
    ],
    enemyPool:[{type:"donut"},{type:"chocolate-cake"},{type:"creampuff"}],
    enemyLevelPool:[1,3],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x5,
    initHero: STANDARD_HERO,
    initHand:[{type:"freeze"}],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks: [{type:"shop", subtype:"freeze"}]
});

//room46 2 portals
rooms.push({
    turnLimit:30,
    scoreCondition: [1600, 1800, 2200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"popcorn",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"chocolate-cake"},{type:"cherrycake"},{type:"popcorn"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x6SplitAndPortal,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room47 portal + timelimit
rooms.push({
    timeLimit:120,
    scoreCondition: [1800, 2100, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"},{type:"jelly"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Split4AndPortal,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:2}]}),
    choicePool:STANDARD_CHOICE_POOL
});


//room48 log + portal
rooms.push({
    turnLimit:26,
    scoreCondition: [1300, 1600, 2000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"archer",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"archer"},{type:"cherrycake"},{type:"souffle"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles7x5,[
        {type:"portal",subtype:"a",position:{x:1,y:1}},
        {type:"portal",subtype:"a",position:{x:7,y:5}},
        {type:"portal",subtype:"b",position:{x:1,y:5}},
        {type:"portal",subtype:"b",position:{x:7,y:1}}
    ]),
    initMovables:[{type:"vertical-log5",subtype:"normal",positions:[{x:4,y:5},{x:4,y:4},{x:4,y:3},{x:4,y:2},{x:4,y:1}]}],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room49
rooms.push({
    turnLimit:20,
    scoreCondition: [3000, 4000, 5000],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"archer",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"archer"},{type:"chocolate-cake"},{type:"donut"}],
    enemyLevelPool: [1,2],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x6H2,
    initHero: STANDARD_HERO,
    initHand:[ {type:"teleport"} ],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks: [{type:"shop", subtype:"teleport"}]
});

//room50 mushmellow 出现
rooms.push({
    turnLimit:20,
    scoreCondition: [1000, 1300, 1700],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"mushmellow",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"mushmellow"},{type:"pudding",subtype:"red"},{type:"donut"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x5,
    initMovables:[
        { type:"mushmellow", positions: [{x:1,y:1}] },
        { type:"mushmellow", positions: [{x:1,y:5}] },
        { type:"mushmellow", positions: [{x:5,y:5}] },
        { type:"mushmellow", positions: [{x:5,y:1}] }
    ],
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL,
    unlocks: [{type:"enemy", subtype:"mushmellow"}]
});

//room51 belt 首次出现
rooms.push({
    turnLimit:25,
    scoreCondition: [2000, 2400, 2800],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"pudding",subtype:"red",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"pudding",subtype:"blue"},{type:"pudding",subtype:"red"},{type:"pudding",subtype:"yellow"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"belt",subtype:"n",position:{x:1,y:1}},
        {type:"belt",subtype:"n",position:{x:1,y:2}},
        {type:"belt",subtype:"n",position:{x:1,y:3}},
        {type:"belt",subtype:"n",position:{x:1,y:4}},
        {type:"belt",subtype:"n",position:{x:1,y:5}},
        {type:"belt",subtype:"s",position:{x:5,y:1}},
        {type:"belt",subtype:"s",position:{x:5,y:2}},
        {type:"belt",subtype:"s",position:{x:5,y:3}},
        {type:"belt",subtype:"s",position:{x:5,y:4}},
        {type:"belt",subtype:"s",position:{x:5,y:5}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room52 belt cycle
rooms.push({
    turnLimit:25,
    scoreCondition: [1600, 2000, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"chocolate-cake"},{type:"creampuff"},{type:"archer"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"belt",subtype:"wn",position:{x:1,y:1}},
        {type:"belt",subtype:"n",position:{x:1,y:2}},
        {type:"belt",subtype:"n",position:{x:1,y:3}},
        {type:"belt",subtype:"n",position:{x:1,y:4}},
        {type:"belt",subtype:"ne",position:{x:1,y:5}},
        {type:"belt",subtype:"sw",position:{x:5,y:1}},
        {type:"belt",subtype:"s",position:{x:5,y:2}},
        {type:"belt",subtype:"s",position:{x:5,y:3}},
        {type:"belt",subtype:"s",position:{x:5,y:4}},
        {type:"belt",subtype:"es",position:{x:5,y:5}},
        {type:"belt",subtype:"e",position:{x:2,y:5}},
        {type:"belt",subtype:"e",position:{x:3,y:5}},
        {type:"belt",subtype:"e",position:{x:4,y:5}},
        {type:"belt",subtype:"w",position:{x:4,y:1}},
        {type:"belt",subtype:"w",position:{x:3,y:1}},
        {type:"belt",subtype:"w",position:{x:2,y:1}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room53 pit 首次出现
rooms.push({
    turnLimit:28,
    scoreCondition: [1700, 2100, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"archer",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"jelly"},{type:"cherrycake"},{type:"archer"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles6x6,[
        {type:"pit",subtype:"normal",position:{x:2,y:2}},
        {type:"pit",subtype:"normal",position:{x:2,y:3}},
        {type:"pit",subtype:"normal",position:{x:2,y:4}},
        {type:"pit",subtype:"normal",position:{x:2,y:5}},
        {type:"pit",subtype:"normal",position:{x:3,y:5}},
        {type:"pit",subtype:"normal",position:{x:4,y:5}},
        {type:"pit",subtype:"normal",position:{x:5,y:5}},
        {type:"pit",subtype:"normal",position:{x:5,y:4}},
        {type:"pit",subtype:"normal",position:{x:5,y:3}},
        {type:"pit",subtype:"normal",position:{x:5,y:2}},
        {type:"pit",subtype:"normal",position:{x:4,y:2}},
        {type:"pit",subtype:"normal",position:{x:3,y:2}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room54 belt & portal
rooms.push({
    turnLimit:26,
    scoreCondition: [1500, 1700, 1900],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"ricecake"},{type:"donut"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles7x5,[
        {type:"belt",subtype:"e",position:{x:2,y:1}},
        {type:"belt",subtype:"e",position:{x:3,y:1}},
        {type:"belt",subtype:"e",position:{x:4,y:1}},
        {type:"belt",subtype:"e",position:{x:5,y:1}},
        {type:"belt",subtype:"w",position:{x:3,y:5}},
        {type:"belt",subtype:"w",position:{x:4,y:5}},
        {type:"belt",subtype:"w",position:{x:5,y:5}},
        {type:"belt",subtype:"w",position:{x:6,y:5}},
        {type:"portal",subtype:"a",position:{x:1,y:1}},
        {type:"portal",subtype:"a",position:{x:7,y:5}},
        {type:"portal",subtype:"b",position:{x:7,y:1}},
        {type:"portal",subtype:"b",position:{x:1,y:5}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room55 4 pillar
rooms.push({
    turnLimit:26,
    scoreCondition: [1500, 1700, 1900],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"ricecake",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"ricecake"},{type:"donut"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7,
    initMovables:[
        {type:"vertical-log2",subtype:"normal",positions:[{x:4,y:2},{x:4,y:1}]},
        {type:"vertical-log2",subtype:"normal",positions:[{x:4,y:7},{x:4,y:6}]},
        {type:"horizontal-log2",subtype:"normal",positions:[{x:1,y:4},{x:2,y:4}]},
        {type:"horizontal-log2",subtype:"normal",positions:[{x:6,y:4},{x:7,y:4}]}
    ],
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room56 pit & portal
rooms.push({
    turnLimit:28,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"popcorn",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"popcorn"},{type:"cherrycake"},{type:"chocolate-cake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles4x6,[
        {type:"pit",subtype:"normal",position:{x:1,y:3}},
        {type:"pit",subtype:"normal",position:{x:2,y:3}},
        {type:"pit",subtype:"normal",position:{x:3,y:3}},
        {type:"pit",subtype:"normal",position:{x:4,y:3}},
        {type:"pit",subtype:"normal",position:{x:1,y:4}},
        {type:"pit",subtype:"normal",position:{x:2,y:4}},
        {type:"pit",subtype:"normal",position:{x:3,y:4}},
        {type:"pit",subtype:"normal",position:{x:4,y:4}},
        {type:"portal",subtype:"a",position:{x:1,y:1}},
        {type:"portal",subtype:"a",position:{x:4,y:6}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room57 4 belt
rooms.push({
    turnLimit:28,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"},{type:"chocolate-cake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"belt",subtype:"wn",position:{x:1,y:1}},
        {type:"belt",subtype:"ne",position:{x:1,y:2}},
        {type:"belt",subtype:"es",position:{x:2,y:2}},
        {type:"belt",subtype:"sw",position:{x:2,y:1}},
        {type:"belt",subtype:"wn",position:{x:1,y:4}},
        {type:"belt",subtype:"ne",position:{x:1,y:5}},
        {type:"belt",subtype:"es",position:{x:2,y:5}},
        {type:"belt",subtype:"sw",position:{x:2,y:4}},
        {type:"belt",subtype:"wn",position:{x:4,y:1}},
        {type:"belt",subtype:"ne",position:{x:4,y:2}},
        {type:"belt",subtype:"es",position:{x:5,y:2}},
        {type:"belt",subtype:"sw",position:{x:5,y:1}},
        {type:"belt",subtype:"wn",position:{x:4,y:4}},
        {type:"belt",subtype:"ne",position:{x:4,y:5}},
        {type:"belt",subtype:"es",position:{x:5,y:5}},
        {type:"belt",subtype:"sw",position:{x:5,y:4}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room58 nail首次出现
rooms.push({
    turnLimit:26,
    scoreCondition: [1500, 1700, 1900],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 9
        },
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"cherrycake"},{type:"jelly"},{type:"creampuff"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"nail",subtype:"normal",position:{x:3,y:1}},
        {type:"nail",subtype:"normal",position:{x:3,y:2}},
        {type:"nail",subtype:"normal",position:{x:3,y:4}},
        {type:"nail",subtype:"normal",position:{x:3,y:5}},
        {type:"nail",subtype:"normal",position:{x:1,y:3}},
        {type:"nail",subtype:"normal",position:{x:2,y:3}},
        {type:"nail",subtype:"normal",position:{x:4,y:3}},
        {type:"nail",subtype:"normal",position:{x:5,y:3}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room59 2个远程 生存
rooms.push({
    turnLimit:27,
    scoreCondition: [1800, 2100, 2500],
    winEveryConditions:["outOfTurn"],
    loseEveryConditions:[
        "outOfTurn",
        "notEnoughScore"
    ],
    enemyPool:[{type:"donut"},{type:"popcorn"},{type:"archer"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles6x4,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room60 belt & nail
rooms.push({
    turnLimit:27,
    scoreCondition: [1800, 2100, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"icecream",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"souffle",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"icecream"},{type:"souffle"},{type:"chocolate-cake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x4,[
        {type:"belt",subtype:"n",position:{x:1,y:1}},
        {type:"belt",subtype:"n",position:{x:2,y:1}},
        {type:"belt",subtype:"n",position:{x:3,y:1}},
        {type:"belt",subtype:"n",position:{x:4,y:1}},
        {type:"belt",subtype:"n",position:{x:5,y:1}},
        {type:"belt",subtype:"n",position:{x:1,y:2}},
        {type:"belt",subtype:"n",position:{x:2,y:2}},
        {type:"belt",subtype:"n",position:{x:3,y:2}},
        {type:"belt",subtype:"n",position:{x:4,y:2}},
        {type:"belt",subtype:"n",position:{x:5,y:2}},
        {type:"belt",subtype:"n",position:{x:1,y:3}},
        {type:"belt",subtype:"n",position:{x:2,y:3}},
        {type:"belt",subtype:"n",position:{x:3,y:3}},
        {type:"belt",subtype:"n",position:{x:4,y:3}},
        {type:"belt",subtype:"n",position:{x:5,y:3}},
        {type:"nail",subtype:"normal",position:{x:1,y:4}},
        {type:"nail",subtype:"normal",position:{x:2,y:4}},
        {type:"nail",subtype:"normal",position:{x:3,y:4}},
        {type:"nail",subtype:"normal",position:{x:4,y:4}},
        {type:"nail",subtype:"normal",position:{x:5,y:4}}
    ]),
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:3,y:2}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room61 5 belt
rooms.push({
    turnLimit:28,
    scoreCondition: [1500, 1800, 2100],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"},{type:"chocolate-cake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles6x6,[
        {type:"belt",subtype:"wn",position:{x:1,y:1}},
        {type:"belt",subtype:"ne",position:{x:1,y:2}},
        {type:"belt",subtype:"es",position:{x:2,y:2}},
        {type:"belt",subtype:"sw",position:{x:2,y:1}},
        {type:"belt",subtype:"wn",position:{x:1,y:5}},
        {type:"belt",subtype:"ne",position:{x:1,y:6}},
        {type:"belt",subtype:"es",position:{x:2,y:6}},
        {type:"belt",subtype:"sw",position:{x:2,y:5}},
        {type:"belt",subtype:"wn",position:{x:5,y:1}},
        {type:"belt",subtype:"ne",position:{x:5,y:2}},
        {type:"belt",subtype:"es",position:{x:6,y:2}},
        {type:"belt",subtype:"sw",position:{x:6,y:1}},
        {type:"belt",subtype:"wn",position:{x:5,y:5}},
        {type:"belt",subtype:"ne",position:{x:5,y:6}},
        {type:"belt",subtype:"es",position:{x:6,y:6}},
        {type:"belt",subtype:"sw",position:{x:6,y:5}},
        {type:"belt",subtype:"wn",position:{x:3,y:3}},
        {type:"belt",subtype:"ne",position:{x:3,y:4}},
        {type:"belt",subtype:"es",position:{x:4,y:4}},
        {type:"belt",subtype:"sw",position:{x:4,y:3}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room62 P lolipop首次出现
rooms.push({
    turnLimit:28,
    scoreCondition: [1700, 2000, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"lolipop",
            number: 16
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"lolipop"},{type:"cherrycake"},{type:"chocolate-cake"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initMovables:[
        {type:"lolipop",positions:[{x:1,y:1}]},
        {type:"lolipop",positions:[{x:5,y:7}]},
        {type:"lolipop",positions:[{x:5,y:5}]}
    ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x7P,
    initHand:[{type:"tail-slash"} ],
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:2,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"lolipop"}]
});

//room63 
rooms.push({
    turnLimit:28,
    scoreCondition: [2200, 2500, 2700],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"creampuff",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"creampuff"},{type:"cherrycake"},{type:"icecream"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x7Eight,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room64 
rooms.push({
    timeLimit:120,
    scoreCondition: [2000, 2300, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"popcorn",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"popcorn"},{type:"cherrycake"},{type:"donut"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles4x7,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room65 tornado skill
rooms.push({
    turnLimit:5,
    scoreCondition: [1000, 1300, 1800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"donut",
            number: 12
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"donut"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x5,
    initMovables:[
        {type:"donut",level:3,positions:[{x:2,y:2}]},
        {type:"donut",level:3,positions:[{x:2,y:4}]},
        {type:"donut",level:3,positions:[{x:4,y:4}]},
        {type:"donut",level:3,positions:[{x:4,y:2}]}
    ],
    initHero: _.extend(clone(STANDARD_HERO),{hp:30, positions: [{x:3,y:3}]}),
    initHand:[{type:"tornado"}],
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"shop", subtype:"tornado"}]
});

//room66
rooms.push({
    timeLimit:120,
    scoreCondition: [2000, 2300, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"lolipop",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTime"
    ],
    enemyPool:[{type:"popcorn"},{type:"mushmellow"},{type:"lolipop"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles4x7,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room67
rooms.push({
    turnLimit:30,
    scoreCondition: [2000, 2300, 2500],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"lolipop",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"archer",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"jelly",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"lolipop"},{type:"archer"},{type:"jelly"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7X,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:4}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room68 nail line
rooms.push({
    turnLimit:23,
    scoreCondition: [1700, 2000, 2300],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"creampuff",
            number: 12
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"cherrycake",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"creampuff"},{type:"donut"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles7x3,[
        {type:"nail",subtype:"normal",position:{x:1,y:2}},
        {type:"nail",subtype:"normal",position:{x:2,y:2}},
        {type:"nail",subtype:"normal",position:{x:3,y:2}},
        {type:"nail",subtype:"normal",position:{x:4,y:2}},
        {type:"nail",subtype:"normal",position:{x:5,y:2}},
        {type:"nail",subtype:"normal",position:{x:6,y:2}},
        {type:"nail",subtype:"normal",position:{x:7,y:2}}
    ]),
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:1}]}),
    choicePool:STANDARD_CHOICE_POOL
});

//room69 nail&pit
rooms.push({
    turnLimit:25,
    scoreCondition: [1700, 2000, 2300],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"icecream",
            number: 9
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"chocolate-cake"},{type:"icecream"},{type:"cherrycake"}],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"nail",subtype:"normal",position:{x:1,y:2}},
        {type:"nail",subtype:"normal",position:{x:2,y:2}},
        {type:"nail",subtype:"normal",position:{x:3,y:2}},
        {type:"nail",subtype:"normal",position:{x:4,y:2}},
        {type:"nail",subtype:"normal",position:{x:5,y:2}},
        {type:"pit",subtype:"normal",position:{x:1,y:3}},
        {type:"pit",subtype:"normal",position:{x:2,y:3}},
        {type:"pit",subtype:"normal",position:{x:4,y:3}},
        {type:"pit",subtype:"normal",position:{x:5,y:3}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room70 eggroll 首次出现
rooms.push({
    turnLimit:22,
    scoreCondition: [1700, 2000, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"eggroll",
            number: 14
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"lolipop"},{type:"eggroll"},{type:"pudding",subtype:"blue"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initMovables:[
        {type:"eggroll",positions:[{x:1,y:7}]},
        {type:"eggroll",positions:[{x:7,y:7}]}
    ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Y,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL,
    unlocks:[{type:"enemy", subtype:"eggroll"}]
});

//room71 nail around
rooms.push({
    turnLimit:24,
    scoreCondition: [2000, 2400, 2800],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"eggroll",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"donut",
            number: 10
        },
        {
            conditionType:"kill-level",
            type:"chocolate-cake",
            number: 10
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"donut"},{type:"eggroll"},{type:"chocolate-cake"}],
    enemyLevelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:changeTiles(tiles5x5,[
        {type:"nail",subtype:"normal",position:{x:1,y:1}},
        {type:"nail",subtype:"normal",position:{x:2,y:1}},
        {type:"nail",subtype:"normal",position:{x:3,y:1}},
        {type:"nail",subtype:"normal",position:{x:4,y:1}},
        {type:"nail",subtype:"normal",position:{x:5,y:1}},
        {type:"nail",subtype:"normal",position:{x:5,y:2}},
        {type:"nail",subtype:"normal",position:{x:5,y:3}},
        {type:"nail",subtype:"normal",position:{x:5,y:4}},
        {type:"nail",subtype:"normal",position:{x:5,y:5}},
        {type:"nail",subtype:"normal",position:{x:4,y:5}},
        {type:"nail",subtype:"normal",position:{x:3,y:5}},
        {type:"nail",subtype:"normal",position:{x:2,y:5}},
        {type:"nail",subtype:"normal",position:{x:1,y:5}},
        {type:"nail",subtype:"normal",position:{x:1,y:4}},
        {type:"nail",subtype:"normal",position:{x:1,y:3}},
        {type:"nail",subtype:"normal",position:{x:1,y:2}}
    ]),
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room72 meteor-shower 首次出现
rooms.push({
    turnLimit:22,
    scoreCondition: [1700, 2000, 2400],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"eggroll",
            number: 14
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"lolipop"},{type:"eggroll"},{type:"pudding",subtype:"blue"}],
    genEnemyStrategy: [{type:"random", number: 3, last: 0}],
    initMovables:[
        {type:"eggroll",positions:[{x:1,y:7}]},
        {type:"eggroll",positions:[{x:7,y:7}]}
    ],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles7x7Y,
    initHero: _.extend(clone(STANDARD_HERO),{positions: [{x:4,y:3}]}),
    choicePool:STANDARD_CHOICE_POOL,
    initHand:[{type:"meteor-shower"}],
    unlocks:[{type:"shop", subtype:"meteor-shower"}]
});

//room73 3 type of range
rooms.push({
    turnLimit:24,
    scoreCondition: [2000, 2300, 2600],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"eggroll",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"archer",
            number: 8
        },
        {
            conditionType:"kill-level",
            type:"popcorn",
            number: 8
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"eggroll"},{type:"archer"},{type:"popcorn"}],
    enemyLevelPool: [1,2],
    itemPool:STANDARD_ITEM_POOL,
    initTiles:tiles5x5,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room74 hard
rooms.push({
    turnLimit:30,
    scoreCondition: [2100, 2400, 2800],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"icecream",
            number: 7
        },
        {
            conditionType:"kill-max-level",
            type:"eggroll",
            number: 7
        },
        {
            conditionType:"kill-max-level",
            type:"chocolate-cake",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"icecream"},{type:"eggroll"},{type:"chocolate-cake"}],
    enemyLevelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    initTiles: tiles6x5Wang,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});

//room75
rooms.push({
    turnLimit:30,
    scoreCondition: [2100, 2400, 2800],
    winEveryConditions:[
        {
            conditionType:"kill-max-level",
            type:"icecream",
            number: 7
        },
        {
            conditionType:"kill-max-level",
            type:"eggroll",
            number: 7
        },
        {
            conditionType:"kill-max-level",
            type:"chocolate-cake",
            number: 7
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{type:"icecream"},{type:"eggroll"},{type:"chocolate-cake"}],
    enemyLevelPool:[1,2],
    itemPool:STANDARD_ITEM_POOL,
    initTiles: tiles6x5Wang,
    initHero: STANDARD_HERO,
    choicePool:STANDARD_CHOICE_POOL
});