class Title < ActiveRecord::Base
 belongs_to :character
 has_and_belongs_to_many :requirements
 has_many :skills
end
