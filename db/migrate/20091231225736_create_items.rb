class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.string :name, :null => false
      t.string :slot
      t.string :description, :null => false
      t.integer :duration
      t.string :grade, :null => false
      t.integer :amt, :null => false, :default => 0
      t.string :stats
      t.string :type
      t.string :image
      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
