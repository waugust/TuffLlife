class CreateLocations < ActiveRecord::Migration
  def self.up
    create_table :locations do |t|
      t.string :name, :default => 0
      t.string :description, :default => 0
      t.integer :levelmin, :default => 0
      t.integer :levelmax, :default => 0
      t.timestamps
    end
  end

  def self.down
    drop_table :locations
  end
end
