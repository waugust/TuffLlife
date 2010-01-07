class Location < ActiveRecord::Base
 has_many :npcs
 has_many :characters

  def spawnnpc
    menpc=Npc.new(:name=>rand(1000))
    self.npcs<<menpc
    menpc.level=rand(10)
    menpc.strength=rand(15)
    menpc.agility=rand(15)
    menpc.stamina=rand(15)
    menpc.defense=2*menpc.level
    menpc.attack=rand(5)
    menpc.statadj
    menpc.save
  end

end

