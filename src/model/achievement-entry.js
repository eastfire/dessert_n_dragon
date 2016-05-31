ACHIEVEMENT_ENTRY_LIST = [
    {
        name: "pass-room",
        maxLevel: 10,
        reward: function( level ){
            return level*100;
        },
        requirement: function (level) {
            return level*20 - 10
        },
        validation:function(){
            var stageNumber;
            for(stageNumber = 1; stageNumber <= rooms.length; stageNumber++) {
                var roomEntry = rooms[stageNumber-1];
                var roomScore = score[stageNumber];
                var scoreCondition = roomEntry.scoreCondition;
                if ((!scoreCondition && roomScore ) || (scoreCondition && roomScore >= scoreCondition[0] )) {

                } else {
                    break;
                }
            }
            return stageNumber;
        }
    },
    {
        name: "hero-die",
        maxLevel: 5,
        reward: function (level) {
            return level * 20;
        },
        requirement: function (level) {
            return Math.pow(5, level)
        }
    },
    {
        name: "gain-card",
        maxLevel: 5,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return Math.pow(5, level)*10
        }
    },
    {
        name:"kill-level-pudding",
        maxLevel: 5,
        reward: function (level) {
            return level * 25;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-pudding",
        maxLevel: 4,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-cherrycake",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-cherrycake",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name: "kill-level-ricecake",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-ricecake",
        maxLevel: 4,
        reward: function (level) {
            return level * 500;
        },
        requirement: function (level) {
            return level*3+2
        }
    },
    {
        name:"kill-level-icecream",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-icecream",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-creampuff",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-creampuff",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-souffle",
        maxLevel: 5,
        reward: function (level) {
            return level * 40;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 20
        }
    },
    {
        name:"kill-max-level-souffle",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*8+2
        }
    },
    {
        name:"kill-level-archer",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-archer",
        maxLevel: 4,
        reward: function (level) {
            return level * 150;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-chocolate-cake",
        maxLevel: 5,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-chocolate-cake",
        maxLevel: 4,
        reward: function (level) {
            return level * 200;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-donut",
        maxLevel: 5,
        reward: function (level) {
            return level * 250;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-donut",
        maxLevel: 4,
        reward: function (level) {
            return level * 400;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-jelly",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-jelly",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-popcorn",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-popcorn",
        maxLevel: 4,
        reward: function (level) {
            return level * 200;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-mushmellow",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-mushmellow",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-lolipop",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-lolipop",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-eggroll",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-eggroll",
        maxLevel: 4,
        reward: function (level) {
            return level * 200;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-baozi",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-baozi",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-strawberry-pie",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-strawberry-pie",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-dumpling",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-dumpling",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-candy",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-candy",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-cake-roll",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-cake-roll",
        index: 38,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-cane",
        index: 39,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-cane",
        maxLevel: 4,
        reward: function (level) {
            return level * 150;
        },
        requirement: function (level) {
            return level*5+5
        }
    },
    {
        name:"kill-level-catapult",
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        }
    },
    {
        name:"kill-max-level-catapult",
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        }
    }
]

var ACHIEVEMENT_ENTRY_MAP = {};
var i = 0;
_.each(ACHIEVEMENT_ENTRY_LIST,function(entry){
    entry.index = i;
    entry.validation = entry.validation || "statistic";
    ACHIEVEMENT_ENTRY_MAP[entry.name] = entry;
    i++;
})
