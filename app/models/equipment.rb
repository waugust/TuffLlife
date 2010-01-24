class Equipment < ActiveRecord::Base
  serialize :rhand
  serialize :lhand
  serialize :chest
  serialize :pants
  serialize :head 

 belongs_to :character

  def items
    slots={}
    self.attributes.each do |slot,val|
      if slot !~ /^.*id|at$/ && val
        slots[slot]=val
      end
    end
    slots
  end
  def stats
    stat={}
    self.attributes.each do |slot,val|
      if slot !~ /^.*id|at$/ && val
        val[:stats].each do |s,v|
          stat[s.to_sym]?stat[s.to_sym]+=v:stat[s.to_sym]=v
        end
      end
    end
    stat
  end
end
