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
    }
})
