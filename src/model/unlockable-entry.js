var UnlockedStatusModel = Backbone.Model.extend({
    defaults:function(){
        return {
        }
    },
    initialize:function(){
        var store = cc.sys.localStorage.getItem(APP_NAME+".unlocked");
        if (store) {
            this.set(JSON.parse(store));
        }
    },
    save:function(){
        cc.sys.localStorage.setItem(APP_NAME+".unlocked", JSON.stringify(this.toJSON()));
    }
})

UNLOCKABLE_ENTRY_MAP = {
    "infinite": {

    }
}