class CreateCharacters < ActiveRecord::Migration
  def self.up
    create_table :characters do |t|
      t.integer :player_id
      t.integer :location_id
      t.string :name, :null => false
      t.boolean :flagged, :null => false, :default => false
      t.datetime :flagged_at
      t.integer :flagged_term
      t.boolean :wanted, :null => false, :default => false
      t.boolean :intoxicated, :null => false, :default => false
      t.datetime :intoxicated_at
      t.intger :intoxicated_term
      t.boolean :addicted, :null => false, :default => false
      t.string :job, :null => false, :default => "unemployed"
      t.integer :exp, :null => false, :default => 0
      t.integer :maxexp, :null => false, :default => 0
      t.integer :level, :null => false, :default => 1
      t.integer :base_health, :null => false, :default => 100
      t.integer :base_energy, :null => false, :default => 50
      t.integer :base_karma, :null => false, :default => 0
      t.integer :base_luck, :null => false, :default => 0
      t.integer :base_strength, :null => false, :default => 10
      t.integer :base_intellect, :null => false, :default => 10
      t.integer :base_agility, :null => false, :default => 10
      t.integer :base_stamina, :null => false, :default => 10
      t.integer :base_attack, :null => false, :default => 1
      t.integer :base_defense, :null => false, :default => 1
      t.integer :current_hp, :null => false, :default => 100
      t.integer :current_en, :null => false, :default => 50
      t.integer :adj_health, :null => false, :default => 100
      t.integer :adj_energy, :null => false, :default => 50
      t.integer :adj_karma, :null => false, :default => 0
      t.integer :adj_luck, :null => false, :default => 0
      t.integer :adj_strength, :null => false, :default => 10
      t.integer :adj_intellect, :null => false, :default => 10
      t.integer :adj_agility, :null => false, :default => 10
      t.integer :adj_stamina, :null => false, :default => 10
      t.integer :adj_attack, :null => false, :default => 1
      t.integer :adj_defense, :null => false, :default => 1

      t.timestamps
    end
  end

  def self.down
    drop_table :characters
  end
end
