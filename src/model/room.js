var SHIFT_RESULT_NORMAL = 1;
var SHIFT_RESULT_MERGE_AND_DISAPPEAR = 2;
var SHIFT_RESULT_MERGE_AND_STAY = 3;

var RoomModel = Backbone.Model.extend({
    defaults:function(){
        return {
            difficulty: "normal", //normal , difficult, easy, na
            winAnyConditions:[], // any pass to win
            winEveryConditions:[], // every pass to win
            loseAnyConditions: [], //any fail to lose
            loseEveryConditions: [], //every fail to lose
            
            name: "",
            width: 7,
            height: 7,
            turnNumber: 0,
            score: 0,
            turnLimit: 0,
            statistic:{},

            genEnemyStrategy: [{
                type:"random",
                number: 2,
                last: 0
            }],
            genEnemyStrategyIndex: 0,
            genEnemyStrategyTurn: 0,
            genItemStrategy: null,
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

            waitingTurn : 0,
            enemyPool: null,
            enemyLevelPool: [1],
            choicePool: [],
            currentChoices: [],
            refreshCount:0
        }
    },
    initialize:function(){
        this.__acceptInput = false;
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
        var tiles = this.__tiles = [];
        for ( var i = 0; i < this.get("width"); i++){
            if ( !tiles[i] ) tiles.push([]);
        }
        var initTiles = this.get("initTiles");
        if ( !initTiles ) return;
        var tiles = this.__tiles;
        for ( var x = 0; x < this.get("width"); x++){
            if ( !initTiles[x] ) continue;
            for ( var y = 0; y < this.get("height"); y++){
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
    },
    initEvents:function(){
        this.on("turn-start-complete", this.generateEnemy, this)
        this.on("gen-enemy-complete", this.afterGenEnemy, this)
        this.on("all-move-complete", this.heroAttack, this)
        this.on("hero-attack-complete", function(){
            cc.log("hero-attack-complete")
            if ( this.passCheckCondition() ) {
                this.enemyAttack();
            }
        },this)
        this.on("enemy-attack-complete", function(){
            cc.log("enemy-attack-complete")
            if ( this.passCheckCondition() ) {
                this.turnEnd();
            }
        }, this)
        this.on("turn-complete", this.turnStart, this)
    },
    initHero:function(){
        var heroEntry = this.get("initHero");
        this.__hero = new MOVABLE_MODEL_MAP[heroEntry.type](heroEntry);
        this.__movables.push(this.__hero);
        
        this.__hero.on("die",function(){
            this.gameOver(false);
        });
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
        for ( var i = 0; i < this.get("width"); i++){
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
        for ( var x = 0; x < this.get("width"); x++){
            for ( var y = 0; y < this.get("height"); y++){
                var tile = this.getTile(x,y);
                if ( tile ) callback.call(context, tile)
            }
        }
    },
    filterTile:function(callback, context){
        var tiles = [];
        for ( var x = 0; x < this.get("width"); x++){
            for ( var y = 0; y < this.get("height"); y++){
                var tile = this.getTile(x,y);
                if ( tile && callback.call(context, tile) ) {
                    tiles.push(tile)
                }
            }
        }
        return tiles;
    },
    turnStart:function(){
        cc.log("turn-complete")
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
            this.trigger("turn-start-complete",this)
        }
    },
    generateOneEnemyType:function(){
        return _.sample( this.get("enemyPool"));
    },
    generateOneEnemyLevel:function(){
        return _.sample( this.get("enemyLevelPool"));
    },
    generateOneEnemy:function(position, typeObj, level){
        var type = typeof typeObj === "string" ? typeObj: typeObj.type;
        if ( MOVABLE_MODEL_MAP[type] ) {
            //FIXME : only single block enemy here. how to generate multi-block enemy?
            var model = new MOVABLE_MODEL_MAP[type]({
                positions: [position],
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
        var currentGenEnemyStrategy = this.get("genEnemyStrategy")[this.get("genEnemyStrategyIndex")]
        if ( currentGenEnemyStrategy ){

            var tiles = this.filterTile(function(tile){
                    return tile.get("canGenEnemy") && !this.getMovableByTile(tile)
                },
            this)
            var number = 0;
            if ( typeof currentGenEnemyStrategy.number === "number" ) {
                number = currentGenEnemyStrategy.number;
            } else if ( typeof currentGenEnemyStrategy.number === "function" ) {
                number = currentGenEnemyStrategy.number.call(this)
            }
            var candidates = [];
            if ( currentGenEnemyStrategy.type === "random" ) {
                candidates = _.sample(tiles, number );
            }

            _.each( candidates,function(tile){
                this.generateOneEnemy( tile.get("position"), this.generateOneEnemyType(), this.generateOneEnemyLevel());
            },this);

            this.set("genEnemyStrategyTurn", this.get("genEnemyStrategyTurn")+1);
            if ( currentGenEnemyStrategy.last !== 0 && this.get("genEnemyStrategyTurn")>=currentGenEnemyStrategy.last) {
                this.set("genEnemyStrategyTurn",0);
                this.set("genEnemyStrategyIndex", this.get("genEnemyStrategyIndex")+1);
            }
            if ( !candidates.length ) {
                cc.log("no enemy gen");
                this.trigger("gen-enemy-complete",this)
            }
        } else {
            this.trigger("gen-enemy-complete",this)
        }
    },
    afterGenEnemy:function(){
        cc.log("afterGenEnemy")
        this.__acceptInput = true;
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
        return this.__acceptInput;
    },
    shift:function(direction){
        cc.log("shift"+direction);
        this.__acceptInput = false;
        var maxStep = 0;

        var movableMapResult = [];
        for ( var i = 0; i < this.get("width"); i++){
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

        traverseMap(movableMapResult, this.get("width"), this.get("height"), REVERSE_DIRECTIONS[direction], function(movable, x, y){
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
    checkAllMovableMoved:function(){
        this.trigger("all-move-complete",this)
    },
    heroAttack:function(){
        cc.log("heroAttack")
        var movable = this.getMovableByPosition(getIncrementPosition(this.__hero.get("positions")[0], this.__hero.get("face")));
        if ( movable instanceof EnemyModel && this.__hero.canAttack(movable) && movable.canBeAttack()){
            this.__hero.normalAttack(movable);
        } else {
            this.trigger("hero-attack-complete",this)
        }
    },
    enemyAttack:function(){
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
        if ( !attackHappened ) this.trigger("enemy-attack-complete",this)
    },
    checkAllEnemyAttacked:function(){
        if (_.every(this.__movables,function(movable){
            if ( movable instanceof EnemyModel ) {
                return movable.get("attackOver")
            } else return true;
        },this))
            this.trigger("enemy-attack-complete",this)
    },
    checkAllMovableGenerated:function(){
        cc.log("checkAllMovableGenerated")
        if (_.every(this.__movables,function(movable){
            return movable.get("generateOver")
        },this))
            this.trigger("gen-enemy-complete",this)
    },
    turnEnd:function(){
        this.set("turnNumber",this.get("turnNumber")+1);
        this.trigger("turn-complete",this)
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
        this.trigger("change:hands",this,cardModel);
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
