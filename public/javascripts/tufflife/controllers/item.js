dojo.provide("tufflife.controllers.item");
dojo.require("tufflife.controllers.utils.itemUtils",true)


dojo.declare("item",null,{
    equip: function(item){
        var slot = tufflife.data.itemstore.getValue(item,"slot");
        var image = tufflife.data.itemstore.getValue(item,"image");
        var targetImage = dojo.attr(dojo.byId('eq_'+slot),'src');
        
        if(targetImage!='images/emptyslot.png')
        {
            tufflife.data.itemstore.fetch({
                query:{image:targetImage},
                onItem: function(item){
                    tufflife.data.itemstore.setValue(item,"location","inventory");
                }
            });

        };
        tufflife.data.itemstore.setValue(item,"location","equipment");
        dojo.attr(dojo.byId('eq_'+slot), 'src', image);
        tufflife.controllers.storage.reset("inventory");
        setItemCtls(item,'eq_'+slot);

    },
    unequip: function(item){
        var slot = tufflife.data.itemstore.getValue(item,"slot");
        var room = tufflife.controllers.storage.inventory.capacity==tufflife.controllers.storage.inventory.items;
        if (!room){
            tufflife.data.itemstore.setValue(item,"location","inventory");
            tufflife.controllers.storage.reset("inventory");
            dojo.attr(dojo.byId('eq_'+slot),'src',"images/emptyslot.png");
            tufflife.controllers.equipment.setItems();
        }
        else{
            var itemname = tufflife.data.itemstore.getValue(item,"item_name");
            tufflife.events.errors.noroom(itemname,"inventory");
        }
    },
    deposit: function(item){
         var room = tufflife.controllers.storage.bank.capacity==tufflife.controllers.storage.bank.items;
        if (!room){
            tufflife.data.itemstore.setValue(item,"location","bank");
            tufflife.controllers.storage.reset("bank");
            tufflife.controllers.storage.reset("inventory");
        }
        else{
            var itemname = tufflife.data.itemstore.getValue(item,"item_name");
            tufflife.events.errors.noroom(itemname,"bank");
        };
    },
    withdrawl: function(item){
         var room = tufflife.controllers.storage.inventory.capacity==tufflife.controllers.storage.inventory.items;
        if (!room){
            tufflife.data.itemstore.setValue(item,"location","inventory");
            tufflife.controllers.storage.reset("bank");
            tufflife.controllers.storage.reset("inventory");
        }
        else{
            var itemname = tufflife.data.itemstore.getValue(item,"item_name");
            tufflife.events.errors.noroom(itemname,"inventory");
        };
    }
});

tufflife.controllers.item = new item;