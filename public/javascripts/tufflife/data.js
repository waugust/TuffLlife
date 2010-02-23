dojo.provide("tufflife.data");
dojo.require("dojo.data.ItemFileWriteStore");

(function(){
//  dojo.addOnLoad(function(){

    dojo.declare("datastore", null, {
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
            }
          })
   tufflife.data = new datastore();

//});
})();