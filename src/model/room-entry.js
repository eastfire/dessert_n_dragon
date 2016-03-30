var room1 = {
    turnLimit:6,
    scoreCondition: [10, 20, 30],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "red",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "yellow",
            number: 1
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "blue",
            number: 1
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",
        subtype:"red"
    },{
        type:"pudding",
        subtype:"yellow"
    },{
        type:"pudding",
        subtype:"green"
    },{
        type:"pudding",
        subtype:"blue"
    }],
    initTiles:[
        [{
            type:"wall",
            subtype: "sw"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "nw"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "se"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "ne"
        } ]
    ],
    initMovables:[
        {
            type:"cherrycake",
            positions: [
                {
                    x:2,
                    y:4
                }
            ]
        },
        {
            type:"cherrycake",
            positions: [
                {
                    x:4,
                    y:4
                }
            ]
        },
        {
            type:"pudding",
            subtype:"yellow",
            positions: [
                {
                    x:3,
                    y:2
                }
            ]
        },
        {
            type:"pudding",
            subtype:"red",
            positions: [
                {
                    x:2,
                    y:2
                }
            ]
        },
        {
            type:"pudding",
            subtype:"blue",
            positions: [
                {
                    x:1,
                    y:2
                }
            ]
        },
        {
            type:"pudding",
            subtype:"yellow",
            positions: [
                {
                    x:3,
                    y:1
                }
            ]
        },
        {
            type:"pudding",
            subtype:"red",
            positions: [
                {
                    x:2,
                    y:1
                }
            ]
        },
        {
            type:"pudding",
            subtype:"blue",
            positions: [
                {
                    x:1,
                    y:1
                }
            ]
        }
    ],
    name: "",
    width: 7,
    height: 7,
    initHero: {
        type:"normalHero",
        positions: [
            {
                x:3,
                y:3
            }
        ],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
};

var room2 = {
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",
        subtype:"red"
    },{
        type:"pudding",
        subtype:"yellow"
    },{
        type:"pudding",
        subtype:"green"
    },{
        type:"pudding",
        subtype:"blue"
    }],
    initTiles:[
        [null,
        {
            type:"wall",
            subtype: "sw"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "w"
        },{
            type:"wall",
            subtype: "nw"
        },
        null],
        [{
            type:"wall",
            subtype: "sw"
        },{
            type:"wall",
            subtype: "swlong"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "nwlong"
        },{
            type:"wall",
            subtype: "nw"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "s"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "n"
        } ],
        [{
            type:"wall",
            subtype: "se"
        },{
            type:"wall",
            subtype: "selong"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"floor",
            subtype: "normal"
        },{
            type:"wall",
            subtype: "nelong"
        },{
            type:"wall",
            subtype: "ne"
        } ],
        [null,
        {
            type:"wall",
            subtype: "se"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "e"
        },{
            type:"wall",
            subtype: "ne"
        },
        null]
    ],
    initMovables:[
    ],
    name: "",
    width: 8,
    height: 8,
    initHero: {
        type:"normalHero",
        positions: [
            {
                x:3,
                y:3
            }
        ],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
};

var room3 = {
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",
        subtype:"red"
    },{
        type:"pudding",
        subtype:"yellow"
    },{
        type:"pudding",
        subtype:"green"
    },{
        type:"pudding",
        subtype:"blue"
    }],
    initTiles:[
        [null,null,{type:"wall", subtype:"sw" },{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null,null],
        [null,{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"sw"},{type:"wall",subtype:"swlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor", subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"}],
        [null,{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"wall",subtype:"nelong"},{type:"wall",subtype:"ne"},null],
        [null,null,{type:"wall",subtype:"se"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null, null]
    ],
    initMovables:[
    ],
    name: "",
    width: 8,
    height: 8,
    initHero: {
        type:"normalHero",
        positions: [
            {
                x:3,
                y:3
            }
        ],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
};

var room4 = {
    turnLimit:15,
    scoreCondition: [100, 150, 200],
    winEveryConditions:[
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "red",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "yellow",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "blue",
            number: 2
        },
        {
            conditionType:"kill-level",
            type:"pudding",
            subtype: "green",
            number: 2
        }
    ],
    loseAnyConditions:[
        "outOfTurn"
    ],
    enemyPool:[{
        type:"pudding",
        subtype:"red"
    },{
        type:"pudding",
        subtype:"yellow"
    },{
        type:"pudding",
        subtype:"green"
    },{
        type:"pudding",
        subtype:"blue"
    }],
    initTiles:[
        [{type:"wall",subtype:"sw" },{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"w"},{type:"wall",subtype:"nw"},null],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype:"normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"wall", subtype: "nwlong"},{type:"wall",subtype:"nw"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"sewlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"wall",subtype: "n"}],
        [{type:"wall",subtype:"s"},{type:"floor",subtype:"normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"wall",subtype: "newlong"},{type:"wall",subtype:"nenw"}],
        [{type:"wall",subtype:"sesw"},{type:"wall",subtype:"sewlong"},{type:"floor",subtype:"normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"wall",subtype: "n"}],
        [{type:"wall",subtype:"se"},{type:"wall",subtype:"selong"},{type:"floor", subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"floor",subtype: "normal"},{type:"wall",subtype: "nelong"},{type:"wall",subtype:"ne"}],
        [{type:"wall",subtype:"se" },{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"e"},{type:"wall",subtype:"ne"},null]
    ],
    initMovables:[
    ],
    name: "",
    width: 7,
    height: 8,
    initHero: {
        type:"normalHero",
        positions: [
            {
                x:3,
                y:3
            }
        ],
        initHp: 100,
        initMaxHp: 100,
        maxHpStrategy:{
            type: "normal"
        },
        expStrategy: {
            type: "normal"
        }, //normal, fix
        isShowLevel: false
    }
};

var rooms = [room1, room2, room3, room4, room1, room2, room1, room2, room1, room2, room1, room2]

        
