dojo.provide("tufflife.controllers.equipment");
dojo.require("tufflife.controllers.utils.itemUtils")


dojo.declare("equipment", null, {
   setItems: function(){
       var slots = ["rhand","lhand","head","chest","pants"];
       dojo.forEach(slots, function(slot){
          var tbCell = dojo.byId(slot);
          dojo.empty(tbCell)
          dojo.create("img",{src:"images/emptyslot.png",id:"eq_"+slot},tbCell,"first")
       });
       tufflife.data.itemstore.fetch({
           query: {location:"equipment"},
           onComplete: function(items){
               dojo.forEach(items, function(item){
                   var slot = tufflife.data.itemstore.getValue(item,"slot");
                   var id = "eq_"+slot
                   var image = tufflife.data.itemstore.getValue(item,"image");
                   var tbCell = dojo.byId(slot)
                   dojo.empty(tbCell);
                   dojo.create("img",{src:image,id:id},tbCell,"first");

                   setItemCtls(item,id);
               })
           }
       })
   },
   constructor: function(){
       this.setItems();
   }
});
tufflife.controllers.equipment = new equipment();