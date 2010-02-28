class HomeController < ApplicationController
  def index
    @character = Character.find(1)
    session[:character]=@character.id
  end
  def setItem
    character = Character.find(session[:character])
    eqItem = Item.find(params[:item_id])
    item_action = params[:item_action]
    if item_action == 'equip'
      eqItem.equip(character)
    elsif item_action=="unequip"
      eqItem.unequip(character)
    elsif item_action=='deposit'
      eqItem.deposit(character)
    elsif item_action=='withdrawl'
      eqItem.withdrawl(character)
    end

    changed = character.adjstats
    response = {}
    response["changes"]=changed
    render :json => changed
  end
  def getStats
  character = Character.find(session[:character])
    response={}
    response["identifier"]="stat"
    response["label"]="stat"
    response["items"]=[{:stat=>"exp",:current=>character.exp,:max=>character.maxexp},
                      {:stat=>"health",:current=>character.current_hp,:max=>character.adj_health},
                      {:stat=>"energy",:current=>character.current_en,:max=>character.adj_energy}]
    render :json => response
  end
  def setStats
  character = Character.find(session[:character])
    stat = params[:stat]
    value = params[:current]
    if stat == 'health'
      stat = "current_hp"
    elsif stat== "energy"
      stat = "current_en"
    end
    character[stat.to_sym]=value
    character.save

    render :json => "updated"
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
    invstats={}
    bankstats = {}
    eqstats={}
    items=[]
    slots = ["rhand","lhand","chest","pants","head"]
    character.inventory.items.each do |item|
      item.stats.each do |stat,value|
        invstats[stat]=value
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
          :children=>[invstats]
        })
    invstats={}
    end
    character.bank.items.each do |item|
      item.stats.each do |stat,value|
        bankstats[stat]=value
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
          :location=>"bank",
          :children=>[bankstats]})
    bankstats={}
    end
    slots.each do |slot|
      if(character.equipment[slot.to_sym]) then
        eqitem = Item.find(character.equipment[slot.to_sym][:id])
        eqitem.stats.each do |stat,value|
          eqstats[stat]=value
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
            :children=>[eqstats]})
      eqstats={}
      end
    end
    render :json => response
  end
  def getVitals
    character=Character.find(session[:character])
    response={}
    response["items"]=[
      :strength=>character.adj_strength,
      :intellect=>character.adj_intellect,
      :agility=>character.adj_agility,
      :stamina=>character.adj_stamina,
      :attack=>character.adj_attack,
      :defense=>character.adj_defense,
      :karma=>character.adj_karma,
      :luck=>character.adj_luck
    ]
    render :json => response
  end
end
