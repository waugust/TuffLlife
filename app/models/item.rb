class Item < ActiveRecord::Base

  serialize :stats, Hash


  has_and_belongs_to_many :inventories
  has_and_belongs_to_many :banks

   def ingest(char)
    if self.kind == "Drug"
      char.addstats(self)
      char.intoxicated=true
      char.intoxicated_at=Time.now
      char.intoxicated_term+=self.duration
    end
  end
  def deposit(char)
    if char.bank.room>0
      if char.items.include?(self)
        if self.kind=="Inventory"
          char.bank.capacity+=self.capacity
        end
        char.inventory.items.delete(self)
        char.bank.items<<self
      elsif char.eqitems.has_value?(self)
        slot=char.eqitems.index(self)
        char.equipment[slot]=0
        char.bank.items<<self
        char.equipment.items.delete(self)
        char.bank.save
        char.equipment.save
        char.save
      else
        #TODO
      end
      char.bank.items<<self
      char.inventory.items.delete(self)
      char.save
    else
      #TODO
    end
  end
  def withdrawl(char)
    if char.bank.items.include?(self)
      if char.inventory.room>0
          if self.kind=="Inventory"
            char.bank.capacity-=self.capacity
          end
          char.inventory.items<<self
          char.bank.items.delete(self)
          char.save
      else
        #TODO
      end
    else
      #TODO
    end
  end
  def equip(char)

    
      #retreive the string value of the equipment slot
      eq_slot=char.equipment.attribute_for_inspect(self.slot.downcase.to_sym)
      if eq_slot
       char.equipment.attributes={self.slot.downcase.to_sym => self}
      else #if the slot already has an item equipped, move it to inventory
       Item.find_by_id(eq_slot.to_i).unequip
       char.equipment.attributes={self.slot.to_sym => self}
      end
      if char.inventory.items.include?(self)
        char.inventory.items.delete(self)
      else
        char.bank.items.delete(self)
      end
      char.bank.save
      char.equipment.save
      char.addequipstats
      char.save
    
  end
  def unequip(char)
    if char.inventory.room>0
      char.attributes.each do |stat,val|
        if stat.to_s =~ /^stat_.*$/
          amt=val-self.attribute_for_inspect(stat.to_sym).to_i
          self.attributes={stat.to_sym=>amt}
        end
      end
      char.inventory.items<<self
      char.equipment.delete(self)
      char.save
      else
        #TODO - unquip when inventory is full action
        return false
    end
  end

end

