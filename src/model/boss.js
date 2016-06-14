var BossModel = EnemyModel.extend({
    isBoss: true,
    isShowLevel: false,
    defaults:function(){
        return _.extend( EnemyModel.prototype.defaults.call(this),{
            hp: 3
        } )
    }
});

MOVABLE_MODEL_MAP["boss-hydra"] = BossModel.extend({
    defaults:function(){
        return _.extend( BossModel.prototype.defaults.call(this),{
            type: "boss-hydra"
        } )
    },
    attackOfLevel:function(l){
        return 15*l;
    },
    expOfLevel:function(l){
        return this.get("baseAttack")*EXP_INFLATION_RATE*3;
    },
    scoreOfLevel:function(l){
        return this.get("baseAttack")*SCORE_INFLATION_RATE*3;
    },
    afterBeHit:function(hero){  //called by view
        this.afterBeAttacked(hero);
        this.set("hp",this.get("hp")-1);
        if ( !this.get("hp") ) {
            this.die(hero);
        }
    }
})