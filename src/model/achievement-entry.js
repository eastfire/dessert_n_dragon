
ACHIEVEMENT_ENTRY_MAP = {
    "kill-level-pudding": {
        index: 0,
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
        index: 1,
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
        index: 2,
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
        index: 3,
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
        index: 4,
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
        index: 5,
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
        index: 6,
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
        index: 7,
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
        index: 8,
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
        index: 9,
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
        index: 10,
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
        index: 11,
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
        index: 12,
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
        index: 13,
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
        index: 14,
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
        index: 15,
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
        index: 16,
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
        index: 17,
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
        index: 18,
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
        index: 19,
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
        index: 20,
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
        index: 21,
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
        index: 22,
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
        index: 23,
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
        index: 24,
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
        index: 25,
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
