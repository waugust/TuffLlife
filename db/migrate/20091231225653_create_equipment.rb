class CreateEquipment < ActiveRecord::Migration
  def self.up
    create_table :equipment do |t|
      t.integer :character_id
      t.text :rhand
      t.string :lhand
      t.string :chest
      t.string :pants
      t.string :head
      t.timestamps
    end
  end

  def self.down
    drop_table :equipment
  end
end
