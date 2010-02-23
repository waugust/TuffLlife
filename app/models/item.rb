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


end

