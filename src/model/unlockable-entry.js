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
        var unlocked = false;
        if ( subtype ) {
            var category = this.get(type);
            if ( category ) {
                if ( !category[subtype] ) {
                    category[subtype] = true;
                    this.trigger("unlocked", type, subtype);
                    this.save();
                    return true;
                }
            } else {
                category = {};
                category[subtype] = true;
                this.set(type, category);
                this.save();
                this.trigger("unlocked", {type:type, subtype:subtype});
                return true;
            }
        } else {
            if ( !this.get(type) ) {
                this.set(type, true);
                this.save();
                this.trigger("unlocked",{type:type});
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
    "infiniteRoom": {

    }
}
