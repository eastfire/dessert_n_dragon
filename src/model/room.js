var SHIFT_RESULT_NORMAL = 1;
var SHIFT_RESULT_MERGE_AND_DISAPPEAR = 2;
var SHIFT_RESULT_MERGE_AND_STAY = 3;

var PHASE_TURN_START = 0;
var PHASE_GEN_ENEMY = 1;
var PHASE_WAIT_USE_INPUT = 2;
var PHASE_MOVE = 3;
var PHASE_HERO_ATTACK = 4;
var PHASE_ENEMY_ATTACK = 5;
var PHASE_TURN_END = 6;

var GenEnemyStrategy = Backbone.Model.extend({
    defaults:function(){
        return {
            enemyPoolChangePerTurn : 31,
            enemyLevelPoolChangePerTurn: 101,
            number:2,
            last: 0
        }
    },
    initialize:function(){

    },
    genEnemy:function(roomModel){
        var tiles = roomModel.filterTile(function(tile){
                return tile.get("canGenEnemy") && !roomModel.getMovableByTile(tile)
            },
            this)
        var number = this.getEnemyNumber(roomModel);

        var candidates = [];
        candidates = _.sample(tiles, number );

        _.each( candidates,function(tile){
            roomModel.generateOneMovable( tile.get("position"), this.generateOneEnemyType(roomModel), this.generateOneEnemyLevel(roomModel));
        },this);

        this.maintain();

        return candidates.length;
    },
    generateOneEnemyType:function(roomModel){
        return _.sample( roomModel.get("enemyPool"));
    },
    generateOneEnemyLevel:function(roomModel){
        return _.sample( roomModel.get("enemyLevelPool"));
    },
    maintain:function(roomModel){

    },
    getEnemyNumber:function(roomModel){
        return this.get("number");
    }
})

var MAX_ENEMY_LEVEL = 18;
var InfiniteGenEnemyStrategy = GenEnemyStrategy.extend({
    defaults:function(){
        return _.extend(GenEnemyStrategy.prototype.defaults.call(this),{
            enemyPoolChangePerTurn : 31,
            enemyLevelPoolChangePerTurn: 101
        })
    },
    maintain:function(roomModel){
        if ( roomModel.get("turnNumber") % this.get("enemyPoolChangePerTurn") === 0 ) {
            var allEnemyPool = [];
            _.each(this.get("baseEnemyPool"),fucntion(enemy){
                allEnemyPool.push(enemy);
            },this);
            _.each(unlockedStatus.get("enemy"),function(value, key){
                allEnemyPool.push({
                    type: key
                }
            },this);
            var currentEnemyPool = this.get("enemyPool");
            var availableEnemyPool = _.filter(allEnemyPool.function(enemy){
                return !_.any(currentEnemyPool, function(currentEnemy){
                    return currentEnemy.type === enemy.type;
                });
            },this);
            
            var newEnemy = _.sample(availableEnemyPool);
            currentEnemyPool.unshift();
            currentEnemyPool.push(newEnemy);
        }
        if ( roomModel.get("turnNumber") % this.get("enemyLevelPoolChangePerTurn") === 0 ) {
            var levelPool = this.get("enemyLevelPool");
            var maxLevel = _.last(levelPool);
            var newMaxLevel = Math.min(MAX_ENEMY_LEVEL , maxLevel+1)
            for ( var i = 1; i <= newMaxLevel; i++){
                levelPool.push(i);
            }
        }
    }
})

var GEN_ENEMY_STRATEGY_MAP = {
    random : GenEnemyStrategy,
    infinite: InfiniteGenEnemyStrategy
}

var RoomModel = Backbone.Model.extend({
    defaults:function(){
        return {
            difficulty: "normal", //normal , difficult, easy, na
            winAnyConditions:[], // any pass to win
            winEveryConditions:[], // every pass to win
            loseAnyConditions: [], //any fail to lose
            loseEveryConditions: [], //every fail to lose
            
            name: "",
            phase: PHASE_TURN_START,
            score: 0,
            turnLimit: 0,
            turnNumber: 0,
            timeLimit: 0,
            timeNumber: 0,
            statistic:{},

            genEnemyStrategy: [{
                type:"random",
                number: 2,
                last: 0
            }],
            genEnemyStrategyIndex: 0,
            genEnemyStrategyTurn: 0,
            genItemStrategy: null,
            itemPool:[],
            genChoiceStrategy: {
                type: "random",
                opt:{}
            },
            drawCardStrategy: {
                type: "random"
            },

            initTiles: null,
            initMovables: null,
            initHero:null,
            initHand: [],
            initDeck: [],

            waitTurn : 0,
            enemyPool: null,
            enemyLevelPool: [1],
            choicePool: [],
            currentChoices: [],
            refreshCount:0,
            refreshCost: 10

        }
    },
    initialize:function(){
        this.__blockInputCount = 0;
        this.initRules();
        this.initTiles();
        this.initMovables();
        this.initHero();
        this.__genMovableMap();
        this.initEnemyPool();
        this.initSkill();
        this.initEvents();
        this.initCondition();
        this.initGenEnemyStrategy();
    },
    getJson:function(){
        var tiles = [];
        this.set("initTiles", tiles);
        var movables = [];
        this.set("initMovables", movables);
        this.set("initHero", this.__hero.toJSON());
    },
    initRules:function(){
        var defaultRules = {
                heroCanLevelUp: true,
                heroCanGetExp: true,
                enemyCanAttack: true,
                showHeroLevel: true,
                canRefreshChoice: true
            };
        this.set("rules", _.extend(defaultRules, this.get("rules")));
    },
    initTiles:function(){
        //TODO tileRotation tileFlipX tileFlipY
        var initTiles = this.get("initTiles");
        if ( !initTiles ) return;
        var tiles = this.__tiles = [];
        this.__width = initTiles.length;
        this.__height = 0;
        for ( var i = 0; i < this.__width; i++){
            if ( !tiles[i] ) tiles.push([]);
        }
        var tiles = this.__tiles;
        for ( var x = 0; x < this.__width; x++){
            if ( !initTiles[x] ) continue;
            var height = initTiles[x].length;
            if ( this.__height < height) this.__height = height
            for ( var y = 0; y <height; y++){
                var tileEntry = initTiles[x][y];
                if ( !tileEntry ) continue;
                if ( tileEntry.type && TILE_MODEL_MAP[tileEntry.type] ) {
                    tiles[x][y]=new TILE_MODEL_MAP[tileEntry.type](_.extend(tileEntry, {
                        position: {
                            x: x,
                            y: y
                        }
                    }))
                }
            }
        }
    },
    getWidth:function(){
        return this.__width;
    },
    getHeight:function(){
        return this.__height;
    },
    initMovables:function(){
        var initMovables = this.get("initMovables");
        if ( !initMovables ) return;
        var movables = this.__movables = [];
        _.each(initMovables,function(movableEntry){
            if ( movableEntry && MOVABLE_MODEL_MAP[movableEntry.type] ) {
                movables.push( new MOVABLE_MODEL_MAP[movableEntry.type](movableEntry) )
            }
        },this)
    },
    initEnemyPool:function(){
    },
    initSkill:function(){
        this.__hand = _.map(this.get("initHand"),function(cardEntry){
            return new CARD_MODEL_MAP[cardEntry.type](cardEntry)
        });
        this.__deck = _.map(this.get("initDeck"),function(cardEntry){
            return new CARD_MODEL_MAP[cardEntry.type](cardEntry)
        });
        this.__discard = _.map(this.get("initDiscard"),function(cardEntry){
            return new CARD_MODEL_MAP[cardEntry.type](cardEntry)
        });
    },
    initEvents:function(){
        this.on("turn-complete", this.turnStart, this)
    },
    initHero:function(){
        var heroEntry = this.get("initHero");
        this.__hero = new MOVABLE_MODEL_MAP[heroEntry.type](heroEntry);
        this.__movables.push(this.__hero);
        
        this.__hero.on("die",function(){
            this.gameOver(false);
        },this);
    },
    getHero:function(){
        return this.__hero
    },
    initCondition:function(){
        this.__winAnyConditions = [];
        this.__winEveryConditions = [];
        this.__loseAnyConditions = [];
        this.__loseEveryConditions = [];
        if ( this.get("scoreCondition") ) {
            this.get("winEveryConditions").push("enoughScore");
        }
        this.__initCondition(this.__winAnyConditions, this.get("winAnyConditions"));
        this.__initCondition(this.__winEveryConditions, this.get("winEveryConditions"));
        this.__initCondition(this.__loseAnyConditions, this.get("loseAnyConditions"));
        this.__initCondition(this.__loseEveryConditions, this.get("loseEveryConditions"));
    },
    initGenEnemyStrategy:function(){

    },
    __initCondition:function(conditions, conditionEntries){
        _.each(conditionEntries,function(conditionEntry){
            if ( typeof conditionEntry === "string" ) { //predefined condition
                conditions.push(CONDITION_FUN_FACTORY_MAP[conditionEntry](this));
            } else if ( typeof conditionEntry === "function") { //custom condition
                conditions.push(conditionEntry);
            } else if ( typeof conditionEntry === "object") { //predefined condition with params
                conditions.push(CONDITION_FUN_FACTORY_MAP[conditionEntry.conditionType](this, conditionEntry ));
            }
        })
    },
    getTile:function(x,y){
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        var tiles = this.__tiles;
        if ( !tiles[x] ) return null;
        return tiles[x][y];
    },
    setTile:function(tile, x,y){
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        var tiles = this.__tiles;
        if ( !tiles[x] ) { //out of bound
            cc.error("tile x:"+x+" y:"+y+" out of bound")
            return this;
        }
        tiles[x][y] = tile;
        tile.set("position",{
            x:x,
            y:y
        })
        this.trigger("tile-changed", this, tile, x, y);
        return this;
    },
    getMovableByPosition:function(x,y){
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        if ( !this.__movableMap[x] ) { //out of bound
            cc.error("__movableMap x:"+x+" y:"+y+" out of bound")
            return null;
        };
        return this.__movableMap[x][y]
    },
    getMovableByTile:function(tile){
        if ( !tile ) return null;
        return this.getMovableByPosition(tile.get("position"));
    },
    addMovable:function(movable,x,y){ //left bottom corner
        if ( x instanceof Object ) {
            y = x.y;
            x = x.x;
        }
        _.each(movable.get("positions"),function(position) {
            if ( !this.__movableMap[position.x+x] ) { //out of bound
                cc.error("__movableMap x:"+(position.x+x)+" y:"+(position.x+y)+" out of bound")
                return;
            };
            this.__movableMap[position.x+x][position.y+y] = movable;
        },this);
        this.trigger("add:movables", this, movable, x, y);
        this.__movables.push(movable)
    },
    removeMovable:function(movable){
        _.each(movable.get("positions"),function(position) {
            if ( this.__movableMap[position.x][position.y] === movable )
                delete this.__movableMap[position.x][position.y];
        },this);
        var index = this.__movables.indexOf(movable);
        if ( index !== -1) {
            this.__movables.splice(index,1)
        } else {
            cc.warn("Cant find movable in this.__movables");
        }
        this.trigger("remove:movables", this, movable);
        movable.destroy();
    },
    __genMovableMap:function(){
        this.__movableMap = [];
        for ( var i = 0; i < this.__width; i++){
            if ( !this.__movableMap[i] ) this.__movableMap.push([]);
        }
        _.each(this.__movables,function(movable){
            _.each(movable.get("positions"),function(position) {
                this.__movableMap[position.x][position.y] = movable;
            },this);
        },this)
    },
    foreachMovable:function(callback, context){
        _.each(this.__movables,callback,context)
    },
    foreachTile:function(callback,context){
        for ( var x = 0; x < this.__width; x++){
            for ( var y = 0; y < this.__height; y++){
                var tile = this.getTile(x,y);
                if ( tile ) callback.call(context, tile)
            }
        }
    },
    filterTile:function(callback, context){
        var tiles = [];
        for ( var x = 0; x < this.__width; x++){
            for ( var y = 0; y < this.__height; y++){
                var tile = this.getTile(x,y);
                if ( tile && callback.call(context, tile) ) {
                    tiles.push(tile)
                }
            }
        }
        return tiles;
    },
    nextPhase:function(){
        var currentPhase = this.get("phase");
        switch (currentPhase) {
            case PHASE_TURN_START:
                this.generateEnemy();
                break;
            case PHASE_GEN_ENEMY:
                this.waitUserInput();
                break;
            case PHASE_WAIT_USE_INPUT: //wait use input, phase will not forward if someone call next phase in this phase;
                break;
            case PHASE_MOVE:
                this.heroNormalAttack();
                break;
            case PHASE_HERO_ATTACK:
                if ( this.getHero().checkLevelUp() ) {

                } else {
                    if (this.passCheckCondition()) {
                        this.enemyAttack();
                    }
                }
                break;
            case PHASE_ENEMY_ATTACK:
                if ( this.getHero().checkLevelUp() ) {
                    cc.log("hero level up, wait")
                } else {
                    if (this.passCheckCondition()) {
                        this.turnEnd();
                    }
                }
                break;
            case PHASE_TURN_END:
                this.turnStart();
                break;
        }
    },
    turnStart:function(){
        cc.log("turnStart");
        this.set("phase", PHASE_TURN_START);
        //reduce waitTurn of hand
        _.each(this.__hand,function(cardModel){
            cardModel.reduceWait(1)
        },this);

        //draw card
        if ( this.canDrawCard() ) {
            for ( var i = 0; i < this.__hero.get("drawEachTurn"); i++ ) {
                this.drawCard();
            }
        }
        //for hero
        this.__hero.onTurnStart();
        //for enemy
        this.foreachMovable(function(movable){
            if ( movable !== this.__hero ) {
                movable.onTurnStart();
            }
        },this)
        //TODO for tiles special ability
        if ( this.passCheckCondition() ) {
            this.nextPhase();
        }
    },

    generateOneMovable:function(position, typeObj, level){
        var type = typeof typeObj === "string" ? typeObj: typeObj.type;
        if ( MOVABLE_MODEL_MAP[type] ) {
            //FIXME : only single block enemy here. how to generate multi-block enemy?
            var model = new MOVABLE_MODEL_MAP[type]({
                positions: [{ //copy position
                    x:position.x,
                    y:position.y
                }],
                level: level,
                type: type,
                subtype: typeof typeObj === "string" ? null: typeObj.subtype
            })
            this.__movables.push( model )
            this.__movableMap[position.x][position.y] = model;
            this.trigger("generate-movable", this, model);
            model.generate();
        }
    },
    generateEnemy:function(){
        cc.log("generateEnemy")
        this.set("phase",PHASE_GEN_ENEMY);
        if ( !this.currentGenEnemyStrategy ) {
            var currentGenEnemyStrategyEntry = this.get("genEnemyStrategy")[this.get("genEnemyStrategyIndex")];
            this.currentGenEnemyStrategy = new GEN_ENEMY_STRATEGY_MAP[currentGenEnemyStrategyEntry.type](currentGenEnemyStrategyEntry);
        }
        if ( this.currentGenEnemyStrategy ){
            var genEnemyCount = this.currentGenEnemyStrategy.genEnemy(this);

            this.set("genEnemyStrategyTurn", this.get("genEnemyStrategyTurn")+1);
            var duration = this.currentGenEnemyStrategy.get("last");
            if ( duration !== 0 && this.get("genEnemyStrategyTurn")>=duration) {
                this.set("genEnemyStrategyTurn",0);
                this.set("genEnemyStrategyIndex", this.get("genEnemyStrategyIndex")+1);
                this.currentGenEnemyStrategy = null;
            }
            if ( !genEnemyCount ) {
                //no enemy can gen
                this.nextPhase();
            }
        } else { //no gen enemy strategy
            this.nextPhase();
        }
    },
    generateOneItemType:function(){
        return _.sample( this.get("itemPool"));
    },
    generateOneItemLevel:function(enemyLevel){
        return Math.min(9,Math.ceil(enemyLevel/4));
    },
    generateOneItem:function(position, enemyLevel){
        cc.log("generateOneItem")
        if ( this.get("itemPool").length ) {
            this.generateOneMovable(position, this.generateOneItemType(), this.generateOneItemLevel(enemyLevel))
        }
    },
    waitUserInput:function(){
        this.set("phase", PHASE_WAIT_USE_INPUT);
        this.unblockInput();
    },
    genLevelUpChoices:function(){
        var currentChoiceStrategy = this.get("genChoiceStrategy");

        var strategy = GEN_CHOICE_STRATEGY_MAP[currentChoiceStrategy.type]

        var choiceEntries = strategy.call(this, this, strategy.opt)
        this.set("currentChoices", choiceEntries);
        return _.map(choiceEntries,function(entry){
            return CHOICE_FACTORY_MAP[entry.type].call(this, this, entry.opt);
        },this);
    },
    isAcceptInput:function(){
        return this.__blockInputCount <= 0;
    },
    blockInput:function(){
        this.__blockInputCount++;
    },
    unblockInput:function(){
        if ( this.__blockInputCount ) this.__blockInputCount--;
    },
    shift:function(direction){
        cc.log("shift"+direction);
        this.set("phase", PHASE_MOVE);
        this.blockInput();
        var maxStep = 0;

        var movableMapResult = [];
        for ( var i = 0; i < this.__width; i++){
            if ( !movableMapResult[i] ) movableMapResult.push([]);
        }
        _.each(this.__movables,function(movable){
            _.each(movable.get("positions"),function(position) {
                movableMapResult[position.x][position.y] = movable;
            },this);
        },this)

        _.each(this.__movables,function(movable){
            movable._step = 100; //VERY BIG NUMBER
            movable._edgeCalculated = 0;
            movable._shiftResult = SHIFT_RESULT_NORMAL;
            movable._movedThisRound = false;
        },this);

        traverseMap(movableMapResult, this.__width, this.__height, REVERSE_DIRECTIONS[direction], function(movable, x, y){
            if ( !movable._movedThisRound ) {
                if ( movable.isEdgePosition(direction,x,y) ) {

                    var stepCount = 0;
                    if ( movable.isMovable(direction) ) {
                        var stepX = x, stepY = y;
                        var increment = INCREMENTS[direction];
                        do {
                            stepX += increment.x;
                            stepY += increment.y;
                            var tile = this.getTile(stepX, stepY);
                            if (!tile) {
                                //out of bound
                                break;
                            }
                            if (tile.isPassable(movable)) {
                                var targetMovable = movableMapResult[stepX][stepY]
                                if (!targetMovable) {
                                    //empty
                                    stepCount++;
                                    if (tile.isCapture(movable)) {
                                        break;
                                    }
                                } else {
                                    if (targetMovable.canBeMergedBy(movable,direction)) {
                                        //can merge
                                        stepCount++;
                                        movable._shiftResult = SHIFT_RESULT_MERGE_AND_DISAPPEAR;
                                        break;
                                    } else if (targetMovable.canMergeTo(movable,direction)) {
                                        //can merge
                                        stepCount++;
                                        movable._shiftResult = SHIFT_RESULT_MERGE_AND_STAY;
                                        break;
                                    } else {
                                        //cant merge
                                        break;
                                    }
                                }
                            } else {
                                break;
                            }
                        } while (true);
                    }
                    if ( movable._step > stepCount) {
                        movable._step = stepCount;
                    }
                    movable._edgeCalculated ++;
                    if ( movable._step === 0 ){
                        movable._movedThisRound = true;
                        movable.faceTo(direction);
                    } else if ( movable._edgeCalculated >= movable.getEdgePositionLength(direction) ) {
                        if ( movable._step > maxStep )
                            maxStep = movable._step;
                        movable._movedThisRound = true;

                        //maintain movableMapResult
                        //remove old mapping
                        _.each(movable.get("positions"), function (position) {
                            movableMapResult[position.x][position.y] = null;
                        }, this)
                        //add new mapping
                        if ( movable._shiftResult !== SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
                            var step = movable._step;
                            _.each(movable.get("positions"),function(position){
                                var x = position.x + step*INCREMENTS[direction].x;
                                var y = position.y + step*INCREMENTS[direction].y;
                                movableMapResult[x][y] = movable;
                            },this);
                        }

                        var moveOpt = {
                            direction:direction,
                            step:movable._step,
                            result: movable._shiftResult
                        }
                        movable.move( moveOpt );
                    }
                }
            }
        },this)

        return maxStep;
    },
    heroNormalAttack:function(){
        cc.log("heroNormalAttack")
        this.set("phase",PHASE_HERO_ATTACK);
        var movable = this.getMovableByPosition(getIncrementPosition(this.__hero.get("positions")[0], this.__hero.get("face")));
        if ( this.__hero.canAttack(movable) ) {
            if (movable instanceof EnemyModel && movable.canBeAttack("normal")) {
                this.__hero.normalAttack(movable);
            } else {
                this.nextPhase();
            }
        } else {
            this.nextPhase();
        }
    },
    heroAttack:function(position, type, callback){
        var movable = this.getMovableByPosition(position);
        if (movable instanceof EnemyModel && movable.canBeAttack(type)) {
            this.__hero.specialAttack(movable, type, callback);
        } else {
            callback.call(false)
        }
    },
    enemyAttack:function(){
        this.set("phase",PHASE_ENEMY_ATTACK);
        var attackHappened = false;
        _.each(this.__movables,function(movable){
            if ( movable instanceof EnemyModel ) {
                if (movable.canAttack(this.__hero) ) {
                    attackHappened = true;
                    movable.attack(this.__hero);
                } else {
                    movable.passAttack();
                }
            }
        },this)
        if ( !attackHappened ) this.nextPhase();
    },
    checkAllEnemyAttacked:function(){
        if (_.every(this.__movables,function(movable){
            if ( movable instanceof EnemyModel ) {
                return movable.get("attackOver")
            } else return true;
        },this))
            this.nextPhase();
    },
    checkAllMovableGenerated:function(){
        if (PHASE_GEN_ENEMY === this.get("phase") && _.every(this.__movables,function(movable){
            return movable.get("generateOver")
        },this)) {
            this.nextPhase();
        }
    },
    turnEnd:function(){
        cc.log("turnEnd")
        this.set("phase",PHASE_TURN_END);
        this.set("turnNumber",this.get("turnNumber")+1);
        this.nextPhase();
    },
    passCheckCondition:function(){
        if ( this.checkWinCondition() ) {
            this.gameOver(true);
            return false;
        }
        if ( this.checkLoseCondition() ) {
            this.gameOver(false);
            return false;
        }
        return true;
    },
    checkWinCondition:function(){
        if (_.any(this.__winAnyConditions,function(conditionCallback){
            return conditionCallback.call(this, this)
        },this) ) return true;
        if ( !this.__winEveryConditions || !this.__winEveryConditions.length ) return false;
        return _.every(this.__winEveryConditions,function(conditionCallback){
            return conditionCallback.call(this, this)
        },this);
    },
    checkLoseCondition:function(){
        if ( _.any(this.__loseAnyConditions,function(conditionCallback){
            return conditionCallback.call(this, this)
        },this) ) return true;
        if ( !this.__loseEveryConditions || !this.__loseEveryConditions.length ) return false;
        return _.every(this.__loseEveryConditions,function(conditionCallback){
            return conditionCallback.call(this, this)
        },this);
    },
    gameOver:function(isWin){
        if ( isWin ) {
            if ( this.get("turnLimit") ) {
                this.getScore( ( this.get("turnLimit") - this.get("turnNumber") ) * 50 );
            }
        }
        this.trigger("game-over", this, isWin);
    },
    unlockUnlockable:function(){
        var unlocks = this.get("unlocks")
        if ( unlocks ) {
            return _.any( unlocks, function(unlock){
                if ( typeof unlock === "string" ) {
                    unlockedStatus.unlock(unlock)
                } else if ( typeof unlock === "object" ) {
                    unlockedStatus.unlock(unlock.type, unlock.subtype)
                }
            },this)
        } else {
            return false;
        }
    },
    logEnemyDie:function(enemyModel){
        var subtype = enemyModel.get("subtype");
        if ( subtype ) {
            this.__killEnemyStatistic(enemyModel.get("type")+"_"+subtype, enemyModel)
        }
        this.__killEnemyStatistic(enemyModel.get("type"), enemyModel)
        this.trigger("change:statistic", this);
    },
    __killEnemyStatistic:function(enemyType, enemyModel){
        var statistic = this.get("statistic");
        var statisticItem = "kill-"+enemyType;
        statistic[statisticItem] = statistic[statisticItem] || 0;
        statistic[statisticItem]++;
        statisticItem = "kill-level-"+enemyType;
        statistic[statisticItem] = statistic[statisticItem] || 0;
        statistic[statisticItem]+=enemyModel.get("level");
        statisticItem = "kill-max-level-"+enemyType;
        statistic[statisticItem] = statistic[statisticItem] || 0;
        if ( statistic[statisticItem] < enemyModel.get("level"))
            statistic[statisticItem]=enemyModel.get("level");
    },
    getScore:function(score){
        this.set("score",this.get("score")+score);
    },
    gainCard:function(opt){
        var cardModel = new CARD_MODEL_MAP[opt.type](opt);
        this.__hand.push(cardModel);
        this.trigger("change:hand",this,"gain");
    },
    drawCard:function(){
        if ( !this.__deck.length ){
            this.__deck = _.shuffle(this.__discard);
            this.__discard = [];
        }

        if ( !this.__deck.length ) return ;

        var opt = this.__deck.pop();
        var cardModel = new CARD_MODEL_MAP[opt.type](opt);
        this.__hand.push(cardModel);
        this.trigger("change:deck",this);
        this.trigger("change:hand",this,"draw");
        cardModel.onDraw();
    },
    discardCard:function(cardModel){
        var index = this.__hand.indexOf(cardModel);
        if ( index !== -1 ) {
            this.__hand.splice(index, 1);
        }
        cardModel.restoreToOrigin();
        this.__discard.push( cardModel.toJSON())
        cardModel.destroy();
        this.trigger("change:hand", this, "discard");
        this.trigger("change:deck", this);
    },
    canDrawCard:function(){
        return this.__hand.length < this.__hero.get("maxHand");
    },
    getHand:function(){
        return this.__hand;
    },
    getDeck:function(){
        return this.__deck;
    },
    getDiscard:function(){
        return this.__discard;
    },
    tick:function(){
        this.set("timeNumber",this.get("timeNumber")+1);
        if ( this.isAcceptInput() && this.get("timeNumber") > this.get("timeLimit") ) {
            this.trigger("game-over",this, false);
        }
    }
})

var saveRoom = function(){
    cc.sys.localStorage.setItem(APP_NAME+".current", currentRoom.getJson());
}

var clearRoom = function(){
    cc.sys.localStorage.removeItem(APP_NAME+".current");
}

var loadRoom = function(){
    var data = cc.sys.localStorage.getItem(APP_NAME+".current");
    if (data) {
        return JSON.parse(data);
    }
    return null;
}
