class Item < ActiveRecord::Base

  serialize :stats, Hash


  has_and_belongs_to_many :inventories
  has_and_belongs_to_many :banks

   def ingest(char)
    if self.type == "Drug"
      char.addstats(self)
      char.intoxicated=true
      char.intoxicated_at=Time.now
      char.intoxicated_term+=self.duration
    end
  end
  def deposit(char)
    if char.bank.room>0
      if char.items.include?(self)
        if self.type=="Inventory"
          char.bank.capacity+=self.capacity
        end
        char.inventory.items.delete(self)
        char.bank.items<<self
      else
        #TODO
      end
      char.save
    else
      #TODO
    end
  end
  def withdrawl(char)
    if char.bank.items.include?(self)
      if char.inventory.room>0
          if self.type=="Inventory"
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

