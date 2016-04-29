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
    __doUnlock:function(type,subtype){
        this.save();
        this.trigger("unlocked", {type:type, subtype:subtype});
        if ( UNLOCKABLE_ENTRY_MAP[type] ) {
            if ( UNLOCKABLE_ENTRY_MAP[type][subtype] && UNLOCKABLE_ENTRY_MAP[type][subtype].onUnlock) {
                UNLOCKABLE_ENTRY_MAP[type][subtype].onUnlock();
            } else {
                if ( UNLOCKABLE_ENTRY_MAP[type].onUnlock ) {
                    UNLOCKABLE_ENTRY_MAP[type].onUnlock();
                }
            }
        }
    },
    unlock:function(type,subtype){
        var unlocked = false;
        if ( subtype ) {
            var category = this.get(type);
            if ( category ) {
                if ( !category[subtype] ) {
                    category[subtype] = true;
                    this.__doUnlock(type,subtype);
                    return true;
                }
            } else {
                category = {};
                category[subtype] = true;
                this.set(type, category);
                this.__doUnlock(type,subtype);
                return true;
            }
        } else {
            if ( !this.get(type) ) {
                this.set(type, true);
                this.__doUnlock(type,subtype);
                return true;
            }
        }
        return false;
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
    "shop":{
        "cross-fire": {
            cost: 100,
            onUnlock:function(){
                unlockedStatus.unlock("card","cross-fire")
            }
        },
        "whirl-slash": {
            cost: 100,
            onUnlock:function(){
                unlockedStatus.unlock("card","whirl-slash")
            }
        }
    }
}
