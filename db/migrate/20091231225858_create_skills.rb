class CreateSkills < ActiveRecord::Migration
  def self.up
    create_table :skills do |t|
      t.integer :title_id
      t.string :name, :null => false
      t.integer :level, :null => false, :default => 1
      t.integer :exp, :null => false, :default => 0
      t.string :description, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :skills
  end
end
