class Npc < ActiveRecord::Base
 belongs_to :location

  def array_rand(an_array)
    max=an_array.size
    val=an_array[rand(max)]
    return val
  end

   def miss?(target)
      miss=5

    x=rand(100)
    if x.in?(1..miss)
      return true
    else
      return false
    end
  end
  def hit
    dmgmax=((self.level*3)+((self.strength*2)-20))+self.attack
    dmgmin=[dmgmax*0.5,dmgmax*0.3,dmgmax*0.1]
    dmg=array_rand(dmgmin)
    return dmg
  end
  def statadj
    self.health+=self.stamina*10
    self.defense+=(self.agility*0.35).to_i
    self.attack+=(self.strength*0.35).to_i
  end

  def attackback(mytarget)
    target_hp=mytarget.stat_health
    dmg=self.hit.to_i
    hits=[1]
    hits<<dmg
    while target_hp>hits.max
        if self.health>0
          unless self.miss?(mytarget)
            target_hp-=dmg
            mytarget.stat_health-=dmg
            puts "#{mytarget.name} hit for #{dmg}, bringing health down to #{target_hp}"
          else
            puts "You missed"
          end
        else
        Thread.main["fighting"]=false
      end
    end
  end
end

