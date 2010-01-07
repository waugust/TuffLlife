class CreateNpcs < ActiveRecord::Migration
  def self.up
    create_table :npcs do |t|
      t.integer :location_id
      t.string :name, :null => false
      t.integer :level, :null => false, :default => 1
      t.integer :heatlh, :null => false, :default => 50
      t.integer :credits, :null => false, :default => 50
      t.integer :strength, :null => false, :default => 5
      t.integer :agility, :null => false, :default => 5
      t.integer :stamina, :null => false, :default => 5
      t.integer :attack, :null => false, :default => 1
      t.integer :defense, :null => false, :default => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :npcs
  end
end
