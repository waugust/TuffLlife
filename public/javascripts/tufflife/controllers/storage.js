dojo.provide("tufflife.controllers.storage");
dojo.require("tufflife.controllers.utils.itemUtils",true)
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.Menu");
dojo.require("dijit.Tooltip");



(function(){
         dojo.declare("storage", null, {
            inventory: {
                capacity: 0,
                name: '',
                credits: 0,
                items: 0
            },
            bank: {
                capacity: 0,
                name: '',
                credits: 0,
                items: 0
            },
         getItems: function(loc, cap, item_count){
                    // if the capacity property hasn't been set yet use the parameter'
                    var capacity = this[loc].capacity==0?cap:this[loc].capacity;
                    //closure
                    var that = this;
                    var itemCount = item_count;
                    //set the item count property for the storate location (inventory or bank)
                    that[loc].items=itemCount;
                    var emptySlots = capacity - itemCount;
                    //index for the item id
                    var startIndex = itemCount+1;
                    if(item_count>0){
                    tufflife.data.itemstore.fetch({
                        query: {location:loc},
                        onError: function(error){
                            alert("error")
                            alert(error.description)
                        },
                        onComplete: function(items,response){

                            var stats=[];
                            for(var i=0;i<emptySlots;i++){
                                dojo.create("img",{src:"images/emptyslot.png", id:loc+"Slot"+startIndex},loc,"last");
                                startIndex++;
                            };
                             dojo.forEach(items,function(item,index){
                               var image = tufflife.data.itemstore.getValue(item,"image");
                        
                               var slot = loc+"Slot"+(parseInt(index)+1);
                               var itemimg = dojo.create("img",{
                                  src:image,
                                  id:slot
                                },loc,"first");
                                 //alert("in storage.js >> "+item.toJSON)
                                setItemCtls(item,slot);
                             });
                          }

                    });
                    }
                    else{

                    for(var i=0;i<emptySlots;i++){
                            dojo.create("img",{src:"images/emptyslot.png", id:loc+"Slot"},loc,"last");
                        };
                    }
         },
        setHeaderAndCredits: function(cfg){
              var loc = cfg.loc || '';
              var name = cfg.name || '';
              var credits = cfg.credits || '';
              var room = cfg.capacity - this[loc].items;
              dojo.create("table",{id:loc+'Header'},loc,"first");
              dojo.create("tr",{id:loc+'HeaderRow'},loc+'Header',"first");
              dojo.create("td",{id:loc+"NameCell",innerHTML:name},loc+'HeaderRow',"first");
              dojo.create("td",{id:loc+"RoomCell",innerHTML: room+'/'+cfg.capacity},loc+'HeaderRow',"last");
              if (loc=='bank')
              {
                  dojo.create("td",{id:loc+"DepositCreditsLabelCell",innerHTML:"Deposit"},loc+'HeaderRow',"last");
                  dojo.create("td",{id:loc+"DepositCreditsCell"},loc+'HeaderRow',"last");
              var DepositSpinner = new dijit.form.NumberSpinner({
                    value: this.inventory.credits,
                    id: "depositSpinner",
                    style: "width:50px",
                    constraints: {
                        currency: "USD",
                        min: 0,
                        max: this.inventory.credits,
                        symbol: '$'
                    }
                },
                loc+"DepositCreditsCell");
              dojo.create("td",{id:"bankWithdrawCreditsLabelCell",innerHTML:"Withdrawl"},loc+'HeaderRow',"last");
              dojo.create("td",{id:"bankWithdrawlCreditsCell"},loc+'HeaderRow',"last");
              var WithdrawlSpinner = new dijit.form.NumberSpinner({
                    value: this.inventory.credits,
                    id: "withdrawlSpinner",
                    style: "width:50px",
                    constraints: {
                        currency: "USD",
                        min: 0,
                        max: this.inventory.credits,
                        symbol: '$'
                    }
                },
                loc+"WithdrawlCreditsCell");
                }
                else
                    {
                        dojo.create("td",{id:"inventoryCreidts",innerHTML:'$'+cfg.credits},loc+'HeaderRow','last')
                    };
                
          },
        constructor: function(){
            var that = this;
            var places = ["inventory","bank"];
            dojo.forEach(places,function(place,index){

            tufflife.data.storage.fetchItemByIdentity({
                       identity: place,
                    onItem: function(item,response){
                        var cap = tufflife.data.storage.getValue(item,"capacity")
                        var name = tufflife.data.storage.getValue(item,"name");
                        var credits = tufflife.data.storage.getValue(item,"credits");
                        var item_count = tufflife.data.storage.getValue(item,"item_count")
                        that[place].capacity = cap;
                        that[place].name = name;
                        that[place].credits = credits;
                        that.getItems(place,cap, item_count);
                        that.setHeaderAndCredits({loc:place,capacity:cap,name:name,credits:credits})
                    }
                });
            });
            }
        });
        tufflife.controllers.storage = new storage();
})();


