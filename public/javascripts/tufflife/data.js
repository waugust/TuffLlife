dojo.provide("tufflife.data");
dojo.require("dojo.data.ItemFileWriteStore");


(function(){
//  dojo.addOnLoad(function(){

    dojo.declare("datastore", null, {
          functions:{
            checkMaxed: function(stat)
            {
                var current;
                var max;

                tufflife.data.stats.fetchItemByIdentity({
                    identity: stat,
                    onItem: function(item){
                        current= tufflife.data.stats.getValue(item,'current')
                        max = tufflife.data.stats.getValue(item,'max');

                        if (current==max)
                            {
                                tufflife.controllers.character.stats[stat+'_maxed']=true
                            }
                            else
                                {
                               
                                    tufflife.controllers.time.updateStat(stat)
                                }
                    }
                });
                
            }
          },
          itemstore: new dojo.data.ItemFileWriteStore({
            url: "/home/getItems"
            /*
              :slot=>item.slot,
              :grade=>item.grade,
              :value=>item.amt,
              :item_name=>item.name,
              :item_id=>item.id,
              :image=>item.image,
              :description=>item.description,
              :item_type=>item.type,
              :location=>"inventory",
              :children=>[stats]
             */
            }),
            itemstore_update: function(item,attr,oldValue, newValue){
                var itemId = tufflife.data.itemstore.getValue(item,"item_id");
                var inventoryItemCount = parseInt(tufflife.controllers.storage.inventory.items);
                var action;
                if(newValue=='equipment')
                    {
                        tufflife.controllers.storage.inventory.items = inventoryItemCount-1
                        action = 'equip'
                    }
                else if (newValue=='bank')
                    {
                        tufflife.controllers.storage.inventory.items = inventoryItemCount-1;
                        tufflife.controllers.storage.bank.items += 1;
                        action='deposit'
                    }
                else
                    {
                        tufflife.controllers.storage.inventory.items = inventoryItemCount+1;
                        if (oldValue=='bank')
                            {
                                tufflife.controllers.storage.bank.items -= 1;
                                action='withdrawl'
                            }
                         else
                             {
                                 action='unequip'
                             };
                    };
               
                dojo.xhrPost({
                    url: "/home/setItem",
                    content: {item_id:itemId,
                              item_action: action},
                    handleAs: "json",
                    load: function(response){
            
                       for(stat in response){

                            if(stat=='health'||stat=='energy')
                                {
                                    tufflife.controllers.character.stats.set({type:stat,max:response[stat]});
                                    
                                }
                            else
                                {
                                    tufflife.data.vitals.fetch({
                                        onItem: function(item){
                                            tufflife.data.vitals.setValue(item,stat, response[stat]);
                                            tufflife.main.gui.vitals();
                                        }
                                    })
                                };
                       };
                       
                    }

                })
            },
          vitals: new dojo.data.ItemFileWriteStore({
             url: "/home/getVitals"
          }),
          stats: new dojo.data.ItemFileWriteStore({
             url: "/home/getStats"
             /*
      *     response["identifier"]="stat"
            response["label"]="stat"
            response["items"]=[{:stat=>"exp",:current=>character.exp,:max=>character.maxexp},
              {:stat=>"health",:current=>character.current_hp,:max=>character.adjstats["health"]},
              {:stat=>"energy",:current=>character.current_en,:max=>character.adjstats["energy"]}]

              */
          }),
          updateStats: function(item,attr,oldValue, newValue){
              var stat = tufflife.data.stats.getValue(item,'stat');
              
              dojo.xhrPost({
                  url: "/home/setStats",
                  content: {stat:stat,current:newValue}
              });

              var current = tufflife.data.stats.getValue(item,'current');
              var max = tufflife.data.stats.getValue(item,'max');
              
              if(stat!='exp')
                  {
                  if (current==max)
                      {
                          tufflife.controllers.character.stats[stat+"_maxed"]=true;
                          if(tufflife.controllers.time[stat+'_timer_running']){
                              tufflife.controllers.time.stopTimer(stat);
                          }
                      }
                  else
                      {
                          tufflife.controllers.character.stats[stat+"_maxed"]=false;
                          tufflife.controllers.time.updateStat(stat);
                      };
                  };
          },

          skills: new dojo.data.ItemFileWriteStore({
             url: "/home/getSkills"
             /*
              response["identifier"]="name"
              response["label"]="name"
              character.titles.each_with_index do |title,index|
                response["items"]=skills.push({:name=>title.name,:type=>"title"})
                title.skills.each do |skill|
                  response["items"]=skills.push({:type=>"skill",:title=>title.name,:level=>skill.level,:skillid=>skill.id,:current_exp=>skill.current_exp,:max_exp=>skill.max_exp,:description=>skill.description,:name=>skill.name})
                  end

              */
          }),
          storage: new dojo.data.ItemFileWriteStore({
             url: "/home/getStorage"
             /*
             response["identifier"]="loc"
             response["items"]=[{:loc=>"inventory",:capacity=>character.inventory.capacity,:name=>character.inventory.name.capitalize,:credits=>character.inventory.credits},
                                {:loc=>"bank",:capacity=>character.bank.capacity,:name=>character.bank.name.capitalize,:credits=>character.bank.credits}]
              */
          }),

          constructor: function(){
                this.itemstore.fetch();
                this.stats.fetch();
                this.skills.fetch();
                this.vitals.fetch();
                this.itemstore.onSet = this.itemstore_update;
                this.stats.onSet = this.updateStats;


            }
          })
   tufflife.data = new datastore();
   
//});
})();