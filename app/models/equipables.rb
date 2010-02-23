module Equipables


  def equip(char)
    #retreive the string value of the equipment slot
    eq_slot=char.equipment[self.slot.downcase.to_sym]
    
    if eq_slot != nil
      Item.find(eq_slot[:id]).unequip(char)
    end #if the slot already has an item equipped, move it to inventory
    char.equipment[self.slot.to_sym]={:id=>self.id,:slot=>self.slot,:stats=>self.stats,:name=>self.name}
    if char.inventory.items.include?(self)
     char.inventory.items.delete(self)
     char.inventory.save
    else
      char.bank.items.delete(self)
      char.bank.save
    end
    
    char.equipment.save
    char.save
  end

  def unequip(char)
    if char.inventory.room>0
      char.inventory.items<<self
      char.equipment[self.slot.to_sym]=nil
      char.equipment.save
    else
      #TODO - unquip when inventory is full action
      return false
    end
  end

end