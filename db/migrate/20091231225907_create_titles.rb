class CreateTitles < ActiveRecord::Migration
  def self.up
    create_table :titles do |t|
      t.integer :character_id
      t.string :name, :null => false
      t.string :level, :null => false, :default => 1
      t.integer :exp, :null => false, :default => 0
      t.string :description, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :titles
  end
end
