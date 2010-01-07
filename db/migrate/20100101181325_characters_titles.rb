class CharactersTitles < ActiveRecord::Migration
  def self.up
    create_table :characters_titles, :id => false do |t|
      t.references :character
      t.references :title
    end
  end

  def self.down
    drop_table :characters_titles
  end
end