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
    },
    unlock:function(type,subtype){
        if ( subtype ) {
            var category = this.get(type);
            if ( category ) {
                category[subtype] = true;
            } else {
                category = {};
                category[subtype] = true;
                this.set(type, category);
            }
            this.save();
        } else {
            this.set(type, true)
        }
    },
    isUnlocked:function(type,subtype){
        if ( subtype ) {
            return this.get(type) && this.get(type)[subtype];
        } else {
            return this.get(type);
        }
    }
})

UNLOCKABLE_ENTRY_MAP = {
    "infinite": {

    }
}