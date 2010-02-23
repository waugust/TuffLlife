class HomeController < ApplicationController
  def index
    @character = Character.find(1)
    session[:character]=@character.id
  end

  def getStats
  character = Character.find(session[:character])
    response={}
    response["identifier"]="stat"
    response["label"]="stat"
    response["items"]=[{:stat=>"exp",:current=>character.exp,:max=>character.maxexp},
                      {:stat=>"health",:current=>character.current_hp,:max=>character.adjstats["health"]},
                      {:stat=>"energy",:current=>character.current_en,:max=>character.adjstats["energy"]}]
    render :json => response
  end
  def getSkills
  character = Character.find(session[:character])
  response={}
  skills=[]
  response["identifier"]="name"
  response["label"]="name"
  character.titles.each_with_index do |title,index|
    response["items"]=skills.push({:name=>title.name,:type=>"title"})
    title.skills.each do |skill|
      response["items"]=skills.push({:type=>"skill",:title=>title.name,:level=>skill.level,:skillid=>skill.id,:current_exp=>skill.current_exp,:max_exp=>skill.max_exp,:description=>skill.description,:name=>skill.name})
      end
    end
  render :json => response
  end
  def getStorage
    character=Character.find(session[:character])
    response={}
    response["identifier"]="loc"
    response["items"]=[{:item_count=>character.inventory.items.length,:loc=>"inventory",:capacity=>character.inventory.capacity,:name=>character.inventory.name.capitalize,:credits=>character.inventory.credits},
                       {:item_count=>character.bank.items.length,:loc=>"bank",:capacity=>character.bank.capacity,:name=>character.bank.name.capitalize,:credits=>character.bank.credits}]
    render :json => response
  end
  def getItems
    character=Character.find(session[:character])
    response={}
    stats={}
    invstats=[]
    bankstats = []
    items=[]
    children={}
    slots = ["rhand","lhand","chest","pants","head"]
    character.inventory.items.each do |item|
      item.stats.each do |stat,value|
        stats[stat]=value
      end

      response["items"]=items.push({
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
        })
    end
    character.bank.items.each do |item|
      item.stats.each do |stat,value|
        stats[stat]=value
      end
      if(stats) then
        response["items"]["children"]<<invstats.push(stats)
      end
      response["items"]=items.push({
          :slot=>item.slot,
          :grade=>item.grade,
          :value=>item.amt,
          :item_name=>item.name,
          :item_id=>item.id,
          :image=>item.image,
          :description=>item.description,
          :item_type=>item.type,
          :location=>"bank"})
    end
    slots.each do |slot|
      if(character.equipment[slot.to_sym]) then
        eqitem = Item.find(character.equipment[slot.to_sym][:id])
        eqitem.stats.each do |stat,value|
          stats[stat]=value
        end
        response["items"]=items.push({
            :slot=>slot,
            :grade=>eqitem.grade,
            :value=>eqitem.amt,
            :item_name=>eqitem.name,
            :item_id=>eqitem.id,
            :image=>eqitem.image,
            :description=>eqitem.description,
            :item_type=>eqitem.type,
            :location=>"equipment",
            :children=>[stats]})
      end
    end
    render :json => response
  end
end
