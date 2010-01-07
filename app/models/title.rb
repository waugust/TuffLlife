class Title < ActiveRecord::Base
 has_and_belongs_to_many :characters
 has_and_belongs_to_many :requirements
 has_many :skills
end
