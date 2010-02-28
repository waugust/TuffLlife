module Equipables


  def equip(char)

    char.equipment[self.slot.to_sym]={:id=>self.id,:slot=>self.slot,:stats=>self.stats,:name=>self.name}
     char.inventory.items.delete(self)
     char.inventory.save
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