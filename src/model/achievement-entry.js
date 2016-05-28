
ACHIEVEMENT_ENTRY_MAP = {
    "hero-die": {
        index: 0,
        maxLevel: 5,
        reward: function (level) {
            return level * 20;
        },
        requirement: function (level) {
            return Math.pow(5, level)
        },
        validation: "statistic"
    },
    "gain-card": {
        index: 0,
        maxLevel: 5,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return Math.pow(5, level)*10
        },
        validation: "statistic"
    },
    "kill-level-pudding": {
        index: 1,
        maxLevel: 5,
        reward: function (level) {
            return level * 25;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-pudding": {
        index: 2,
        maxLevel: 4,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-cherrycake": {
        index: 3,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-cherrycake": {
        index: 4,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-ricecake": {
        index: 5,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-ricecake": {
        index: 6,
        maxLevel: 4,
        reward: function (level) {
            return level * 500;
        },
        requirement: function (level) {
            return level*3+2
        },
        validation: "statistic"
    },
    "kill-level-icecream": {
        index: 7,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-icecream": {
        index: 8,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-creampuff": {
        index: 9,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-creampuff": {
        index: 10,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-souffle": {
        index: 11,
        maxLevel: 5,
        reward: function (level) {
            return level * 40;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 20
        },
        validation: "statistic"
    },
    "kill-max-level-souffle": {
        index: 12,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*8+2
        },
        validation: "statistic"
    },
    "kill-level-archer": {
        index: 13,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-archer": {
        index: 14,
        maxLevel: 4,
        reward: function (level) {
            return level * 150;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-chocolate-cake": {
        index: 15,
        maxLevel: 5,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-chocolate-cake": {
        index: 16,
        maxLevel: 4,
        reward: function (level) {
            return level * 200;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-donut": {
        index: 17,
        maxLevel: 5,
        reward: function (level) {
            return level * 250;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-donut": {
        index: 18,
        maxLevel: 4,
        reward: function (level) {
            return level * 400;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-jelly": {
        index: 19,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-jelly": {
        index: 20,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-popcorn": {
        index: 21,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-popcorn": {
        index: 22,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-mushmellow": {
        index: 23,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-mushmellow": {
        index: 24,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-lolipop": {
        index: 25,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-lolipop": {
        index: 26,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-eggroll": {
        index: 27,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-eggroll": {
        index: 28,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-baozi": {
        index: 29,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-baozi": {
        index: 30,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-strawberry-pie": {
        index: 31,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-strawberry-pie": {
        index: 32,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-dumpling": {
        index: 33,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-dumpling": {
        index: 34,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-candy": {
        index: 35,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-candy": {
        index: 36,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-cake-roll": {
        index: 37,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-cake-roll": {
        index: 38,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-cane": {
        index: 39,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-cane": {
        index: 40,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    },
    "kill-level-catapult": {
        index: 41,
        maxLevel: 5,
        reward: function (level) {
            return level * 50;
        },
        requirement: function (level) {
            return Math.pow(10, level) * 10
        },
        validation: "statistic"
    },
    "kill-max-level-catapult": {
        index: 42,
        maxLevel: 4,
        reward: function (level) {
            return level * 100;
        },
        requirement: function (level) {
            return level*5+5
        },
        validation: "statistic"
    }
}
