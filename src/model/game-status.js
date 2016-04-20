var GameStatusModel = Backbone.Model.extend({
    defaults:function(){
        return {
            money: 100
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
    }
})
