var SCORE_INFLATION_RATE = 20;
var EXP_INFLATION_RATE = 10;

var EnemyModel = MovableModel.extend({
    defaults:function(){
        return _.extend( MovableModel.prototype.defaults.call(this),{
            name:"",
            attackRage: 1,
            attackType: ATTACK_TYPE_MELEE,
            baseAttack: 1,
            isAllFaceSame: true,
            exp: 1,
            dexterity: 0,
            score: SCORE_INFLATION_RATE
        } )
    },
    initialize:function(){
        MovableModel.prototype.initialize.call(this);
        this.__dead = false;
        this.onLevelChange();
        this.on("change:level", this.onLevelChange,this)
    },
    onLevelChange:function(){
        var l = this.get("level");
        this.set("exp",this.expOfLevel(l))
        this.set("score", this.scoreOfLevel(l) );
        this.set("baseAttack", this.attackOfLevel(l) );
        this.set("dexterity", this.dexterityOfLevel(l) );
    },
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE
    },
    scoreOfLevel:function(l){
        return (l+1)*l/2*SCORE_INFLATION_RATE
    },
    attackOfLevel:function(l){
        return 1;
    },
    dexterityOfLevel:function(l){
        return 0;
    },
    beforeBeAttacked:function(hero){
    },
    checkHit:function(hero, options){
        if ( options.attackType === ATTACK_TYPE_MELEE && Math.random() < this.get("dexterity")*0.01 ) {
            return false;
        }
        return true;
    },
    getClosestPoint:function(p){
        return _.min(this.get("positions"), function(position){
            return getPointDistance(position, p )
        },this)
    },
    checkRange:function(hero){
        var heroPosition = hero.get("positions")[0];
        var range = this.get("attackRage");
        return _.any(this.get("positions"), function(position){
            return getPointDistance(position, heroPosition ) <= range
        },this)
    },
    beforeBeHit:function(hero){
    },
    beHit:function(hero){
        this.beforeBeHit(hero);
        this.trigger("beHit",this,hero);
    },
    afterBeHit:function(hero){  //called by view
        this.afterBeAttacked(hero);
        this.die(hero);
    },
    beforeDie:function(hero){
        this.__dead = true;
    },
    die:function(hero){
        this.beforeDie(hero);
        this.trigger("die",this, hero)
    },
    afterDie:function(hero){ //called by view
        currentRoom.getHero().gainExp(this.get("exp"));
        currentRoom.getScore(this.get("score"));

        currentRoom.logEnemyDie(this);
        var enemyLevel = this.get("level");
        var dropItem = false;
        var p = null;
        _.any(this.get("positions"),function(position){ //generate one item is enough ?
            if ( this.checkDropItem() ) {
                dropItem = true;
                p = position;
                return true;
            }
        },this);

        currentRoom.removeMovable(this);
        if ( dropItem ) {
            currentRoom.generateOneItem(p, enemyLevel)
        }
    },
    checkDropItem:function(){
        return Math.random() < this.getDropRate();
    },
    getDropRate:function(){
        return Math.min(0.5, (this.get("level") + currentRoom.getHero().getProp("luck")) * LUCK_EFFECT)
    },
    beforeDodgeAttack:function(hero){
    },
    dodgeAttack:function(hero){
        this.beforeDodgeAttack(hero);
        this.trigger("dodgeAttack",this,hero);
    },
    afterDodgeAttack:function(hero){ //called by view
        this.afterBeAttacked(hero);
    },
    afterBeAttacked:function(hero){
    },
    beforeAttack:function(hero){
    },
    canAttack:function(hero){
        //TODO other status effect
        if ( this.checkRange(hero) ) {
            return true;
        }
        return false
    },
    canBeAttack:function(attackType){
        return !this.__dead;
    },
    passAttack:function(){
        this.set("attackOver", true);
    },
    attack:function(hero){
        this.set("attackOver", false);
        hero.beforeBeAttacked(this)
        this.beforeAttack(hero);
        this.trigger("attack",this, hero)
    },
    hitOrMiss:function(hero){ //called by view
        if (hero.checkHit(this)) {
            //hit
            var attackPoint = this.hit(hero); //输出
            var damage = hero.beHit(this, attackPoint); //调整
            if ( damage > 0 ) { //能造成伤害
                damage = this.damageHero(hero, damage); //第二次调整
                hero.takeDamage(this, damage); //real damage
            } else {
                //blocked
                this.beBlocked(hero, attackPoint);
                hero.blocked(attackPoint)
            }
            return true;
        } else {
            //miss
            this.miss(hero);
            hero.dodgeAttack(this);
            return false;
        }
    },
    beforeDamageHero:function(hero, damage){
    },
    damageHero:function(hero, damage){
        this.beforeDamageHero(hero);
        return damage;
    },
    beBlocked:function(hero, attackPoint){

    },
    beforeMiss:function(hero){
    },
    miss:function(hero){
        this.beforeMiss(hero)
        this.trigger("miss",this, hero)
    },
    afterMiss:function(hero){ //called by view
    },
    beforeHit:function(hero){
    },
    hit:function(hero){
        this.beforeHit(hero)
        this.trigger("hit",this, hero)
        return this.getAttackPoint();
    },
    afterHit:function(hero){ //called by view
    },
    afterAttack:function(hero){
        this.set("attackOver", true);
        currentRoom.checkAllEnemyAttacked();
    },
    getAttackPoint:function(){
        return this.get("baseAttack") * (this.get("angry")?2:1);
    }
})



//超低
//always 1

//极低
//Math.round(Math.log(l+1)*2)
//[1, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6]

//很低
//Math.round(l/2)
//[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]

//较低
//l
//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
//Math.round(l*3/2) - 1
//[1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29]

//一般
//l*2-1
//[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39]

//较高
//l*3-2
//[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58]
//Math.round(Math.log(l+1)*l)
//[1, 2, 4, 6, 9, 12, 15, 18, 21, 24, 27, 31, 34, 38, 42, 45, 49, 53, 57, 61]

//很高
//Math.round(Math.log(l+1)*l)*2-1
//[1, 3, 7, 11, 17, 23, 29, 35, 41, 47, 53, 61, 67, 75, 83, 89, 97, 105, 113, 121]

//极高
//(l+1)/2*l
//[1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210]

//超高
//l*l
//[1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400]


MOVABLE_MODEL_MAP.archer = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "archer",
            attackType: ATTACK_TYPE_RANGE
        } )
    },
    checkRange:function(hero){
        return true;
    },
    expOfLevel:function(l){ //一般
        return l*2*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //很低
        return Math.round(l/2);
    }
})

MOVABLE_MODEL_MAP.baozi = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "baozi",
            attackType: ATTACK_TYPE_MELEE
        } )
    },
    expOfLevel:function(l){ //一般
        return l*2*EXP_INFLATION_RATE;
    },
    afterHit:function(heroModel){
        heroModel.getForbidDraw(Math.min(8,Math.round(this.get("level")/3))+2);
    },
    attackOfLevel:function(l){ //较低
        return Math.round(l*3/2);
    }
})

MOVABLE_MODEL_MAP["cake-roll"] = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "cake-roll"
        } )
    },
    expOfLevel:function(l){ //较高
        return Math.round(Math.log(l+1)*l+1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //较高
        return Math.round(Math.log(l+1)*l+1)
    },
    checkHit:function(hero, options){
        if ( options.attackType === ATTACK_TYPE_MAGIC ) {
            this.levelUp(1);
            return false;
        }
        return EnemyModel.prototype.checkHit.call(this,hero,options);
    }
})

MOVABLE_MODEL_MAP.candy = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "candy"
        } )
    },
    afterHit:function(heroModel){
        this.checkCurse(heroModel);
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //较低
        return l;
    },
    getCurseRate:function(heroModel){
        var level = this.get("level");
        return level/10;
//        return 1;
    },
    checkCurse:function(model){
        if (this.getCurseRate(model) > Math.random() ){
            model.getCursed();
        }
    }
})

MOVABLE_MODEL_MAP.cane = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "cane"
        } )
    },
    afterAllMove:function(movable){
        EnemyModel.prototype.afterAllMove.call(this,movable);
        this.reCalculateAttack();
    },
    afterGenerate:function(){
        this.reCalculateAttack();
        EnemyModel.prototype.afterGenerate.call(this);
    },
    reCalculateAttack:function(){
        var myPosition = this.get("positions")[0];
        var itemClassCount = 0;
        for ( var i = myPosition.x-1; i < myPosition.x+2; i++ ) {
            for ( var j = myPosition.y-1; j < myPosition.y+2; j++ ) {
                var movable = currentRoom.getMovableByPosition(i, j);
                if (movable instanceof ItemModel) {
                    itemClassCount++;
                }
            }
        }
        cc.log(itemClassCount)
        this.set("baseAttack", this.attackOfLevel(this.get("level"))*(itemClassCount+1));
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //一般
        return l*2-1;
    }
})

MOVABLE_MODEL_MAP.catapult = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "catapult"
        } )
    },
    afterAllMove:function(movable){
        EnemyModel.prototype.afterAllMove.call(this,movable);
        this.reCalculateAttack();
    },
    afterGenerate:function(){
        this.reCalculateAttack();
        EnemyModel.prototype.afterGenerate.call(this);
    },
    afterTurnStartStep3:function(){
        EnemyModel.prototype.afterTurnStartStep3.call(this);
        this.reCalculateAttack();
    },
    afterHeroTeleport:function(){
        EnemyModel.prototype.afterHeroTeleport.call(this);
        this.reCalculateAttack();
    },
    afterTeleport:function(){
        EnemyModel.prototype.afterTeleport.call(this);
        this.reCalculateAttack();
    },
    reCalculateAttack:function(){
        var myPosition = this.get("positions")[0];
        var heroPosition = currentRoom.getHero().get("positions")[0];
        var rate = Math.max(0, Math.abs(heroPosition.x - myPosition.x)+Math.abs(heroPosition.y - myPosition.y)-3);
        this.set("baseAttack", this.attackOfLevel(this.get("level"))*Math.round(rate/2));
    },
    checkRange:function(hero){
        var myPosition = this.get("positions")[0];
        var heroPosition = currentRoom.getHero().get("positions")[0];
        return Math.abs(heroPosition.x - myPosition.x)+Math.abs(heroPosition.y - myPosition.y) > 3
    },
    expOfLevel:function(l){ //极高
        return ((l+1)/2*l+1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //极低
        return Math.round(Math.log(l+1)*2);
    }
})

MOVABLE_MODEL_MAP.cherrycake = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "cherrycake"
        } )
    },
    expOfLevel:function(l){ //一般
        return l*2*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //一般
        return l*2-1;
    }
})

MOVABLE_MODEL_MAP["chocolate-cake"] = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "chocolate-cake"
        } )
    },
    expOfLevel:function(l){ //较高
        return (Math.round(Math.log(l+1)*l)+1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //较高
        return Math.round(Math.log(l+1)*l)+1;
    }
})

MOVABLE_MODEL_MAP.creampuff = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "creampuff"
        } )
    },
    afterBeMerged:function(movable){
        EnemyModel.prototype.afterBeMerged.call(this,movable);
        if ( movable instanceof MOVABLE_MODEL_MAP.creampuff ) {
            //angry around
            var position = this.get("positions")[0];
            _.each( INCREMENTS, function(increment){
                var model = currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
                if ( model instanceof EnemyModel ) {
                     model.getAngry(1);
                }
            },this );
        }
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //一般
        return l*2-1;
    }
})

MOVABLE_MODEL_MAP.donut = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "donut"
        } )
    },
    expOfLevel:function(l){ //超高
        return (l*l+1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){  //超高
        return l*l+1;
    }
})

MOVABLE_MODEL_MAP.dumpling = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "dumpling"
        } )
    },
    afterAllMove:function(movable){
        EnemyModel.prototype.afterAllMove.call(this,movable);
        //recalcute attack
        var myPosition = this.get("positions")[0];
        var sameClassCount = 0;
        for ( var i = myPosition.x-1; i < myPosition.x+2; i++ ) {
            for ( var j = myPosition.y-1; j < myPosition.y+2; j++ ) {
                var movable = currentRoom.getMovableByPosition(i, j);
                if (movable instanceof MOVABLE_MODEL_MAP.dumpling) {
                    sameClassCount++;
                }
            }
        }

        this.set("baseAttack", this.attackOfLevel(this.get("level"))*sameClassCount);
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //较低
        return l;
    }
})

MOVABLE_MODEL_MAP.eggroll = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "eggroll",
            attackType: ATTACK_TYPE_RANGE
        } )
    },
    checkRange:function(hero){
        return hero.get("positions")[0].x === this.get("positions")[0].x ||
             hero.get("positions")[0].y === this.get("positions")[0].y;
    },
    expOfLevel:function(l){ //很高
        return (Math.round(Math.log(l+1)*l)*2)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //很高
        return Math.round(Math.log(l+1)*l)*2;
    }
})

MOVABLE_MODEL_MAP.icecream = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "icecream"
        } )
    },
    afterBeMerged:function(movable){
        EnemyModel.prototype.afterBeMerged.call(this,movable);
        if ( movable instanceof MOVABLE_MODEL_MAP.icecream ) {
            //freeze around
            var position = this.get("positions")[0];
            _.each( INCREMENTS, function(increment){
                var model = currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
                if ( model ) {
                    this.checkFreeze(model);
                }
            },this );
        }
    },
    afterHit:function(heroModel){
        this.checkFreeze(heroModel);
    },
    expOfLevel:function(l){ //一般
        return (Math.round(l*2.5)-1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //一般
        return l*2-1;
    },
    getFreezeRate:function(heroModel){
        var level = this.get("level");
        return Math.min(0.7,level*5/200+0.1);
//        return 1;
    },
    checkFreeze:function(model){
        if (this.getFreezeRate(model) > Math.random() ){
            model.getFrozen(2);
        }
    }
})

MOVABLE_MODEL_MAP.jelly = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "jelly"
        } )
    },
    expOfLevel:function(l){ //较低
        return l*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //很低
        return Math.round(l/2);
    },
    dexterityOfLevel:function(l){
        return Math.min(83, l*(l+1)/2+5);
    }
})

MOVABLE_MODEL_MAP.lolipop = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "lolipop"
        } )
    },
    afterHit:function(heroModel){
        this.checkDisturb(heroModel);
    },
    expOfLevel:function(l){ //一般
        return Math.round(l*EXP_INFLATION_RATE*2.5)
    },
    attackOfLevel:function(l){ //一般
        return 2*l-1;
    },
    getDisturbRate:function(heroModel){
        var level = this.get("level");
        return level/15+0.3;
        //return 1;
    },
    getDisturbEffect:function(heroModel){
        var level = this.get("level");
        return Math.floor(level/6)+1;
    },
    checkDisturb:function(model){
        if (this.getDisturbRate(model) > Math.random() ){
            model.getDisturb(this.getDisturbEffect(model));
        }
    }
})


MOVABLE_MODEL_MAP.mushmellow = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "mushmellow"
        } )
    },
    afterBeMerged:function(movable){
        EnemyModel.prototype.afterBeMerged.call(this,movable);
        if ( movable instanceof MOVABLE_MODEL_MAP.mushmellow ) {
            var tiles = _.each(_.sample(currentRoom.filterTile(function(tileModel){
                return tileModel.isPassable() && !tileModel.get("cloud");
            },this),this.getCloudNumber()),
            function(tileModel){
                tileModel.set("cloud", this.getCloudTime());
            },this);
        }
    },
    getCloudNumber:function(){
        return Math.min(3, Math.ceil(this.get("level") / 10 ));
    },
    getCloudTime:function(){
        return Math.min(3, Math.ceil(this.get("level") / 6 ))+2;
    },
    expOfLevel:function(l){ //较低
        return (Math.round(l*3/2) - 1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //较低
        return l;
    }
})

MOVABLE_MODEL_MAP.popcorn = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "popcorn",
            attackType: ATTACK_TYPE_RANGE
        } )
    },
    checkRange:function(hero){
        return true;
    },
    expOfLevel:function(l){ //较高
        return (l*3-1)*EXP_INFLATION_RATE
    },
    afterHit:function(heroModel){
        if (this.getDizzyRate(heroModel) > Math.random() ){
            heroModel.getDizzy(2);
        }
    },
    getDizzyRate:function(heroModel){
        var level = this.get("level");
        return Math.min(0.7,level*5/200+0.1);
    },
    attackOfLevel:function(l){ //一般
        return Math.round(l*3/2) - 1;
    }
})

MOVABLE_MODEL_MAP.pudding = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "pudding"
        } )
    },
    expOfLevel:function(l){ //极低
        return Math.round(Math.log(l+1)*2)*EXP_INFLATION_RATE
    }
})

MOVABLE_MODEL_MAP.ricecake = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "ricecake",
            isMovable: false
        } )
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //较高
        return l*3;
    }
})

MOVABLE_MODEL_MAP.souffle = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "souffle"
        } )
    },
    afterBeMerged:function(movable){
        EnemyModel.prototype.afterBeMerged.call(this,movable);
        this.levelUp(1);
        if ( movable instanceof MOVABLE_MODEL_MAP.souffle ) {
            //freeze around
            var position = this.get("positions")[0];
            _.each( INCREMENTS, function(increment){
                var model = currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
                if ( model instanceof EnemyModel ) {
                    model.levelUp(1);
                }
            },this );
        }
    },
    expOfLevel:function(l){ //一般
        return (l*2-1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){ //一般
        return l*2-1;
    }
})

MOVABLE_MODEL_MAP["strawberry-pie"] = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "strawberry-pie"
        } )
    },
    expOfLevel:function(l){ //超高
        return (l*l)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){ //超高
        return l*l;
    },
    afterHit:function(heroModel){
        this.levelUp(1);
    }
})

//TODO 诅咒

//TODO 中毒

//TODO 偷道具升级

//TODO 防魔

//TODO 变瞎

//TODO 将攻击导向周围敌人


