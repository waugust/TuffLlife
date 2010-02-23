class Character < ActiveRecord::Base
  serialize :adjstats, Hash

  has_and_belongs_to_many :titles
  has_one :home
  has_one :bank
  has_one :inventory
  has_one :equipment
  belongs_to :player
  belongs_to :location
  has_many :addictions
  has_many :skills, :through => :titles
  
  def short_skills
    skills={}
    self.titles.each do |title|
      title.skills.each do |skill|
        skills[skill.name]={:level=>skill.level,:description=>skill.description,:current_exp=>skill.current_exp,:max_exp=>skill.max_exp}
      end
    end
    skills
  end
  def eqitems
    self.equipment.items
  end

  def range_rand(min,max)
    min + rand(max-min)
  end
  def array_rand(an_array)
    max=an_array.size
    val=an_array[rand(max)]
    return val
  end

  
  def miss?(mytarget)
    mskill=self.titles[0].skills.find(:all, :conditions => {:name=>"melee"}).level
    if mskill<=mytarget.defense
      diff=mytarget.defense-mskill
      if diff<=10
        miss=((diff*0.001)+0.05)*100.round
      else
        miss=(((diff-10)*0.004)+0.06)*100.round
      end
    else
      miss=5
    end
    x=rand(100)
    if x.in?(1..miss)
      return true
    else
      return false
    end
  end
  def hit
    dmgmax=((self.level*3)+((self.stat_strength*2)-20))+self.stat_attack
    dmgmin=[dmgmax*0.5,dmgmax*0.3,dmgmax*0.1]
    dmg=array_rand(dmgmin)
    return dmg
  end
  def setXP
    if self.level<30
      self.maxexp=40*(self.level**2) + 360*self.level
    else
      self.maxexp=(65*(self.level**2))-(165*self.level)-6750
    end
  end
  def mod(value)
    modified=(value-10)/2
    return modified
  end
  def adjstats 
    stats={}
    self.attributes.each do |k,v| #loop through the attributes
      if k =~ /^stat_.*$/         #filter out only the stat_ attributes
        stat=k.gsub(/^stat_/,'')  #renam that attrbute to exclude the "stat_" prefix
        eq=self.equipment.stats   #equipment stat summary hash
        value=eq.key?(stat.to_sym)?v+eq[stat.to_sym]:v #if the stat summary hash has the stat to adjust adjust it
        stats[stat]=value   #set new values
      end
    end
    stats["health"]+=stats["stamina"]*10
    self.current_hp+=stats["stamina"]*10
    stats["defense"]+=stats["agility"]*0.35.to_i
    stats["attack"]+=stats["strength"]*0.35.to_i
    stats["energy"]+=stats["agility"]*2.to_i
    self.current_en+=stats["agility"]*2.to_i
    stats
  end
  def hpen_max
    self.current_hp=adjstats["health"]
    self.current_en=adjstats["energy"]
  end
  def items
    self.inventory.items
  end

end
