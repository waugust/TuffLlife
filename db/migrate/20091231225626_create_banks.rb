class CreateBanks < ActiveRecord::Migration
  def self.up
    create_table :banks do |t|
      t.integer :character_id
      t.string :name, :null => false
      t.integer :capacity, :null => false, :default => 10
      t.integer :credits, :null => false, :default => 0
      t.timestamps
    end
  end

  def self.down
    drop_table :banks
  end
end
