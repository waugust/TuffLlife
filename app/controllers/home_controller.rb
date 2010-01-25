class HomeController < ApplicationController
  def index
    @character = Character.find(1)
    session[:character]=@character.id
  end
  def skills
    @character = Character.find(session[:character])
    render :json => @character.skills
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
  def get_inventory
    character=Character.find(session[:character])
    inv = {}
    items = []
    character.inventory.items.each_with_index do |item,index|
      inv["items"]=items.push({:name=>item.name,:item_id=>item.id,:stats=>item.stats,:image=>item.image,:description=>item.description})
    end
    inv["capacity"]=character.inventory.capacity
    inv["credits"]=character.inventory.credits
    inv["name"]=character.inventory.name
    render :json => inv
  end
end
