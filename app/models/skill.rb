class Skill < ActiveRecord::Base
 belongs_to :title
 has_many :characters, :through => :titles
end
