var GameStatusModel = Backbone.Model.extend({
    defaults:function(){
        return {
            money: 100,
            achievements: {},
            tutorials:{},
            perks:null,
            scoreScale:1
        }
    },
    initialize:function(){
        var store = cc.sys.localStorage.getItem(APP_NAME+".gameStatus");
        if (store) {
            this.set(JSON.parse(store));
        }
        this.initPerks();
    },
    save:function(){
        cc.sys.localStorage.setItem(APP_NAME+".gameStatus", JSON.stringify(this.toJSON()));
    },
    gainMoney:function(amount){
        this.set("money",this.get("money")+amount);
        this.save();
    },
    useMoney:function(amount){
        this.set("money",this.get("money")-amount);
        this.save();
    },
    checkPassTutorial:function(item){
        return this.get("tutorials")[item];
    },
    passTutorial:function(item){
        this.get("tutorials")[item] = 1;
        this.save();
    },
    initPerks:function(){
        this.__perkModel = [];
        _.each(this.get("perks"),function(perkName){
            var perkClass = PERK_MAP[perkName];
            if ( perkClass ) {
                this.__perkModel.push(new PERK_MAP[perkName]());
            }
        },this);
    },
    clearPerks:function(){
        _.each(this.__perkModel,function(perkModel){
            perkModel.destroy();
        });
        this.__perkModel = [];
    },
    selectPerks:function(perks, scoreScale){
        this.clearPerks();
        this.set({
            perks:perks,
            scoreScale:scoreScale
        });
        this.save();
        this.initPerks();
    }
})
