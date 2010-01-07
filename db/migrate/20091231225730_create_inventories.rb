class CreateInventories < ActiveRecord::Migration
  def self.up
    create_table :inventories do |t|
      t.integer :character_id
      t.integer :capacity, :null => false, :default => 5
      t.string :description, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :inventories
  end
end
