class Character < ActiveRecord::Base
 # serialize :adjstats, Hash

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
    dmgmax=((self.level*3)+((self.base_strength*2)-20))+self.base_attack
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
    changed_stats={}
    self.attributes.each do |k,value| #loop through the attributes
      if k =~ /^base_.*$/         #filter out only the base_ attributes
        stat=k.gsub(/^base_/,'')  #renam that attrbute to exclude the "base_" prefix
        eq=self.equipment.stats   #equipment stat summary hash
        #if the equipment stat hash has a value for the current stat
        if eq.key?(stat.to_sym)
          #value of the stat in the equipment stat hash
          eqstat= eq[stat.to_sym]

            if stat=='defense'||stat=='attack'
              if stat=='defense'
                if eq.key?(:agility)
                  self["adj_agility"]=eq[:agility]+self["base_agility"]
                else
                  statmod = self.base_defense+(self.adj_agility*0.35).to_i
                  finaldef = statmod+eqstat
                  if finaldef!=self["adj_defense"]
                    changed_stats[:defense]=finaldef
                  end
                  self["adj_defense"]=finaldef
                end
              else
                if eq.key?(:strength)
                  self["adj_strength"]=eq[:strength]+self["base_strength"]
                else
                  statmod = self.base_attack+(self.adj_strength*0.35).to_i
                  finalatk = statmod+eqstat
                  if finalatk!=self["adj_attack"]
                    changed_stats[:attack]=finalatk
                  end
                  self["adj_attack"]=finalatk
                end
              end
            else
              if self["adj_"+stat]!=eqstat+value
                changed_stats[stat.to_sym]=eqstat+value
                self["adj_"+stat]=eqstat+value
              end
            end

        else
          if stat=='defense'||stat=='attack'
            if stat=='defense'
              if eq.key?(:agility)
                self["adj_agility"]=eq[:agility]+self["base_agility"]
              else
                statmod = self.base_defense+(self.adj_agility*0.35).to_i
                finaldef = statmod
                if finaldef!=self["adj_defense"]
                  changed_stats[:defense]=finaldef
                end
                self["adj_defense"]=statmod
              end
            else
              if eq.key?(:strength)
                self["adj_strength"]=eq[:strength]+self["base_strength"]
              else
                statmod = self.base_attack+(self.adj_strength*0.35).to_i
                finalatk = statmod
                if finalatk!=self["adj_attack"]
                  changed_stats[:attack]=finalatk
                end
                self["adj_attack"]=finalatk
              end
            end
          else
            if (self["adj_"+stat]!=self["base_"+stat])&&stat!="health"&&stat!="energy"
              changed_stats[stat.to_sym]=self["base_"+stat]
              self["adj_"+stat]=self["base_"+stat]
            end
          end
        end
      end
    end

    health_change =self.base_health+(self.adj_stamina*10)
    if health_change!=self.adj_health
      changed_stats[:health]=health_change
      self.adj_health=health_change
    end

    energy_change = self.base_energy+(self.adj_agility*2.to_i)
    if energy_change!=self.adj_energy
      changed_stats[:energy]=energy_change
      self.adj_energy= energy_change
    end
    self.save
    return changed_stats
  end
  def adjstats2
    changed_stats=[]
    self.attributes.each do |k,v| #loop through the attributes
      if k =~ /^base_.*$/         #filter out only the base_ attributes
        stat=k.gsub(/^base_/,'')  #renam that attrbute to exclude the "base_" prefix
        eq=self.equipment.stats   #equipment stat summary hash
        value=eq.key?(stat.to_sym)?v+eq[stat.to_sym]:v #if the stat summary hash has the stat to adjust adjust it
          if (self["adj_"+stat]!=value&&v!=value)
            changed_stats.push({stat.to_sym=>value})
            self["adj_"+stat]=value
          end
      end
    end
    health_change =self.base_health+(self.adj_stamina*10)
    if health_change!=self.adj_health
      if changed_stats.collect { |stats| stats.has_key?(:health) }.include?(true)
        changed_stats.reject! { |stats| stats.has_key?(:health) }
      end
      changed_stats.push({:health=>health_change})
      self.adj_health=health_change
    end

    defense_change = self.base_defense+(self.adj_agility*0.35.to_i)
    if defense_change!=self.adj_defense
      if changed_stats.collect { |stats| stats.has_key?(:defense) }.include?(true)
        changed_stats.reject! { |stats| stats.has_key?(:defense) }
      end
      changed_stats.push({:defense=>defense_change})
      self.adj_defense=defense_change
    end
    attack_change = self.base_attack+(self.adj_strength*0.35.to_i)
    if attack_change!=self.adj_attack
      if changed_stats.collect { |stats| stats.has_key?(:attack) }.include?(true)
        changed_stats.reject! { |stats| stats.has_key?(:attack) }
      end
      changed_stats.push({:attack=>attack_change})
      self.adj_attack=attack_change
    end
    energy_change = self.base_energy+(self.adj_agility*2.to_i)
    if energy_change!=self.adj_energy
      if changed_stats.collect { |stats| stats.has_key?(:energy) }.include?(true)
        changed_stats.reject! { |stats| stats.has_key?(:energy) }
      end

      changed_stats.push({:energy=>energy_change})
      self.adj_energy= energy_change
    end
    self.save
    return changed_stats
  end

  def hpen_max
    self.current_hp=adjstats["health"]
    self.current_en=adjstats["energy"]
  end
  def items
    self.inventory.items
  end

end
