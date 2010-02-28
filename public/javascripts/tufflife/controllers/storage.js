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
         setItemCount: function(loc,count){
            this[loc].items=count;
         },
         getItems: function(cfg){
                    var loc = cfg.loc
                    var cap = cfg.cap || this[loc].capacity
                    var item_count = cfg.item_count || this[loc].items

                    // if the capacity property hasn't been set yet use the parameter'
                    var capacity = this[loc].capacity==0?cfg.cap:this[loc].capacity;

                    //closure
                    var that = this;
                    var itemCount = item_count;
                    //set the item count property for the storate location (inventory or bank)
                    that[loc].items=itemCount;

                    //index for the item id

                    for(var i=0;i<capacity;i++){
                            dojo.create("img",{src:"images/emptyslot.png", id:loc+"Slot"+i},loc+'_right',"last");
                        };
                    if (item_count>0){
                    tufflife.data.itemstore.fetch({
                        query: {location:loc},
                        onError: function(error){
                            alert("error")
                            alert(error.description)
                        },
                        onComplete: function(items,response){

                             dojo.forEach(items,function(item,index){
                               var image = tufflife.data.itemstore.getValue(item,"image");

                               var imgNode = dojo.query('#'+loc+'_right [src=\'images/emptyslot.png\']')[0]
                               
                               var imgId = dojo.attr(imgNode,'id')

                               dojo.attr(imgNode,'src',image)

                                setItemCtls(item,imgId);
                             });
                          }

                    });
                    }

                    

         },
        setHeaderAndCredits: function(cfg){
              var loc = cfg.loc;
              var name = cfg.name || this[loc].name;
              var credits = cfg.credits || this[loc].credits;
              var capacity = cfg.capacity || this[loc].capacity;
              var room = capacity - this[loc].items;

              dojo.create("table",
                {id:loc+'Header',
                style:'width:90%;font-size:120%'}
                ,loc+'_left',"first");
              dojo.create("tr",
                {id:loc+'HeaderRow1'}
                ,loc+'Header',"first");
              dojo.create("td",
                {id:loc+"NameCell",
                innerHTML:name,
                colspan: 2,
                style:"background-color:gray;color:white;font-size:150%;text-align:center;border-color:gray;border-style:ridge"}
                ,loc+'HeaderRow1',"last");
              dojo.create("tr",
                {id:loc+'HeaderRow2'}
                ,loc+'HeaderRow1',"after");
              dojo.create("td",
                {id:loc+"RoomCellLabel",
                innerHTML: "Free Space: "}
                ,loc+'HeaderRow2',"first");
              dojo.create("td",
                {id:loc+"RoomCell",
                innerHTML: room+'/'+capacity}
                ,loc+'HeaderRow2',"last");
              if (loc=='bank')
              {
                  dojo.create("tr",{id:loc+'HeaderRow3'},loc+'HeaderRow2',"after");
                  dojo.create("td",{id:loc+"DepositCreditsLabelCell",innerHTML:"Deposit"},loc+'HeaderRow3',"first");
                  dojo.create("td",{id:loc+"DepositCreditsCell"},loc+'HeaderRow3',"last");
              var DepositSpinner = new dijit.form.NumberSpinner({
                    value: 0,
                    style: "width:100px",
                    id: "depositSpinner",
                    constraints: {
                        currency: "USD",
                        min: 0,
                        max: this.inventory.credits,
                        symbol: '$'
                    }
                },
                loc+"DepositCreditsCell");
              dojo.create("tr",{id:loc+'HeaderRow4'},loc+'HeaderRow3',"after");
              dojo.create("td",{id:"bankWithdrawCreditsLabelCell",innerHTML:"Withdrawl"},loc+'HeaderRow4',"first");
              dojo.create("td",{id:"bankWithdrawlCreditsCell"},loc+'HeaderRow4',"last");
              var WithdrawlSpinner = new dijit.form.NumberSpinner({
                    value: 0,
                    style: "width:100px",
                    id: "withdrawlSpinner",
                    constraints: {
                        currency: "USD",
                        min: 0,
                        max: this.bank.credits,
                        symbol: '$'
                    }
                },
                loc+"WithdrawlCreditsCell");
                }
                else
                    {
                        dojo.create("tr",{id:loc+'HeaderRow3'},loc+'HeaderRow2',"after");
                        dojo.create("td",{id:"inventoryCreidts",innerHTML:'$'+credits},loc+'HeaderRow3','last')
                    };
                
          },
          reset: function(loc){
            dojo.empty(dojo.byId(loc+'_right'));
            dojo.empty(dojo.byId(loc+'_left'));
            if(loc=='bank')
                {
                    dijit.byId('depositSpinner').destroy();
                    dijit.byId('withdrawlSpinner').destroy();
                };

            tufflife.controllers.storage.setHeaderAndCredits({loc:loc});
            tufflife.controllers.storage.getItems({loc:loc});

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
                        that.getItems({loc:place,cap:cap,item_count:item_count});
                        that.setHeaderAndCredits({loc:place,capacity:cap,name:name,credits:credits})
                    }
                });
            });
            }
        });
        tufflife.controllers.storage = new storage();
})();


