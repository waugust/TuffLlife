class Inventory < ActiveRecord::Base
  has_and_belongs_to_many :items
  belongs_to :character

  def room
    self.capacity-self.items.size
  end

end
