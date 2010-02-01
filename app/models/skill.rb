class Skill < ActiveRecord::Base
 has_one :title
 has_many :characters, :through => :titles
end
