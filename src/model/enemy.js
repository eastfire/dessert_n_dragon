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
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE*2
    },
    attackOfLevel:function(l){
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
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE*3+1;
    },
    afterHit:function(heroModel){
        heroModel.getForbidDraw(Math.min(8,Math.round(this.get("level")/3))+2);
    },
    attackOfLevel:function(l){
        return Math.round(l*3/2);
    }
})

MOVABLE_MODEL_MAP.cherrycake = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "cherrycake"
        } )
    },
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE*2
    },
    attackOfLevel:function(l){
        return l;
    }
})

MOVABLE_MODEL_MAP["chocolate-cake"] = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "chocolate-cake"
        } )
    },
    expOfLevel:function(l){
        return (l*3-1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
        return l*2;
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
    expOfLevel:function(l){
        return (l+1)*EXP_INFLATION_RATE*2;
    },
    attackOfLevel:function(l){
        return l;
    }
})

MOVABLE_MODEL_MAP.donut = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "donut"
        } )
    },
    expOfLevel:function(l){
        return (l*l+1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
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
        var sameClassCount = 1;

        _.each(DIRECTIONS,function(direction){
            var position = getIncrementPosition(myPosition,direction);
            var movable = currentRoom.getMovableByPosition(position);
            if ( movable instanceof MOVABLE_MODEL_MAP.dumpling) {
                sameClassCount++;
            }
        },this);

        cc.log(sameClassCount)
        this.set("baseAttack", this.attackOfLevel(this.get("level"))*sameClassCount);
    },
    expOfLevel:function(l){
        return (l+1)*EXP_INFLATION_RATE*2;
    },
    attackOfLevel:function(l){
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
    expOfLevel:function(l){
        return l*(l+1)/2*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
        return l*2+1;
    }
})

MOVABLE_MODEL_MAP.jelly = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "jelly"
        } )
    },
    expOfLevel:function(l){
        return (l+1)*EXP_INFLATION_RATE;
    },
    attackOfLevel:function(l){
        return Math.round(l/2);
    },
    dexterityOfLevel:function(l){
        return Math.min(75, l*(l+1)/2);
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
    expOfLevel:function(l){
        return Math.round(l*EXP_INFLATION_RATE*2.5)
    },
    attackOfLevel:function(l){
        return l;
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

MOVABLE_MODEL_MAP.lolipop = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "lolipop"
        } )
    },
    afterHit:function(heroModel){
        this.checkDisturb(heroModel);
    },
    expOfLevel:function(l){
        return Math.round(l*EXP_INFLATION_RATE*2.5)
    },
    attackOfLevel:function(l){
        return l;
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
    expOfLevel:function(l){
        return Math.round(Math.log(l+1)*l)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
        return Math.round(l/2);
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
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE*3
    },
    afterHit:function(heroModel){
        if (this.getDizzyRate(heroModel) > Math.random() ){
            heroModel.getDizzy(2);
        }
    },
    getDizzyRate:function(heroModel){
        var level = this.get("level");
        return Math.min(0.7,level*5/200+0.1);
//        return 1;
    },
    attackOfLevel:function(l){
        return l;
    }
})

MOVABLE_MODEL_MAP.pudding = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "pudding"
        } )
    }
})

MOVABLE_MODEL_MAP.ricecake = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "ricecake",
            isMovable: false
        } )
    },
    expOfLevel:function(l){
        return (l*2-1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
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
    expOfLevel:function(l){
        return l*EXP_INFLATION_RATE*2;
    },
    attackOfLevel:function(l){
        return l;
    }
})

MOVABLE_MODEL_MAP["strawberry-pie"] = EnemyModel.extend({
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            type: "strawberry-pie"
        } )
    },
    expOfLevel:function(l){
        return (l*l+1)*EXP_INFLATION_RATE
    },
    attackOfLevel:function(l){
        return l*l;
    },
    afterHit:function(heroModel){
        this.levelUp(1);
    }
})

//TODO sweet-dumpling 汤圆 回合开始时如果为双数等级且能分开则分开

//TODO 偷道具升级

//TODO 防魔

//TODO 变瞎

//TODO 将攻击导向周围敌人


