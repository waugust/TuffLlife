class HomeController < ApplicationController
  def index
    @character = Character.find(1)
    session[:character]=@character.id
  end
  def vitals
    @character = Character.find(session[:character])
    vitalshash={}
    vitalshash["health"]={:current=>@character.current_hp,:max=>@character.adjstats["health"]}
    vitalshash["energy"]={:current=>@character.current_en,:max=>@character.adjstats["energy"]}
    render :json => vitalshash
  end
  def get_item
    item = Item.find(params[:item])
    istats=""
    item.stats.each do |k,v|
      istats+="#{k.to_s.capitalize}: #{v.to_s}"
    end
    
    itemhash={:item_id=>item.id,
      :name=>item.name,
      :slot=>item.slot,
      :description=>item.description,
      :grade=>item.grade,
      :value=>item.amt,
      :stats=>istats,
      :item_type=>item.type,
      :item_image=>item.image}

    render :json => itemhash
  end
  def location
    character= Character.find(session[:character])
    path = {:path=>character.location.image}
    render :json => path
  end
  def exp
    character = Character.find(session[:character])
    exp = character.exp
    maxexp = character.maxexp
    response_data={:exp=>exp,:maxexp=>maxexp}
    render :json => response_data
  end
  def get_all_items()
    character = Character.find(session[:character])
    items={}
    inv_items=[]
    bank_items=[]
    character.inventory.items.each do |item|
      inv_items<<{:id=>item.id,:image=>item.image}
    end
    character.bank.items.each do |item|
      bank_items<<{:id=>item.id,:image=>item.image}
    end
    items["bank"]={
      :items=>bank_items,
      :storage=>{:credits=>character.bank.credits,:name=>character.bank.name,:room=>character.bank.capacity}}
    items["inventory"]={
      :items=>inv_items,
      :storage=>{:room=>character.inventory.capacity,:name=>character.inventory.description,:credits=>character.inventory.credits}}
    items["equipment"]={
      :head=>character.equipment.head,
      :chest=>character.equipment.chest,
      :rhand=>character.equipment.rhand,
      :lhand=>character.equipment.lhand,
      :pants=>character.equipment.pants}
    render :xml => items
  end
  def equip_item
    character = Character.find(session[:character])
    item = Item.find(params[:itemid])
    item.equip(character)
    response={:status=>'OK'}
    render :json => response
  end
  def unequip_item
    character = Character.find(session[:character])
    item = Item.find(params[:itemid])
    item.unequip(character)
    response={:status=>'OK'}
    render :json => response
  end
  #begin new plan
    def charStats
    character = Character.find(session[:character])
      response={}
      response["exp"]={:current=>character.exp,:max=>character.maxexp}
      response["health"]={:current=>character.current_hp,:max=>character.adjstats["health"]}
      response["energy"]={:current=>character.current_en,:max=>character.adjstats["energy"]}
      render :json => response
    end
    def skills
    character = Character.find(session[:character])
    response={}
    skills=[]
    character.titles.each_with_index do |title,index|
      title.skills.each do |skill|
        response[title.name]=skills.push({:current_exp=>skill.current_exp,:max_exp=>skill.max_exp,:description=>skill.description,:name=>skill.name})
      end
    end
    render :json => response
  end
  def get_stored_items
    character=Character.find(session[:character])
    location = params[:loc]
    inv = {}
    items = []
    if location=='inventory' then
      col = character.inventory.items
      store = character.inventory
    else
      col = character.bank.items
      store = character.bank
    end

    col.each_with_index do |item,index|
      statsHTML = ''
      item.stats.each do |stat, value|
        statsHTML = "#{stat}: #{value}<br>"
      end
      inv["items"]=items.push({
          :slot=>item.slot,
          :grade=>item.grade,
          :value=>item.amt,
          :name=>item.name,
          :item_id=>item.id,
          :stats=>statsHTML,
          :image=>item.image,
          :description=>item.description,
          :item_type=>item.type})
    end
    inv["capacity"]=store.capacity
    inv["credits"]=store.credits
    inv["name"]=store.name
    render :json => inv
  end
end
