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
      t.integer :stat_health, :null => false, :default => 100
      t.integer :stat_energy, :null => false, :default => 50
      t.integer :credits, :null => false, :default => 200
      t.integer :stat_karma, :null => false, :default => 0
      t.integer :stat_luck, :null => false, :default => 0
      t.integer :stat_strength, :null => false, :default => 10
      t.integer :stat_intellect, :null => false, :default => 10
      t.integer :stat_agility, :null => false, :default => 10
      t.integer :stat_stamina, :null => false, :default => 10
      t.integer :stat_attack, :null => false, :default => 1
      t.integer :stat_defense, :null => false, :default => 1
      t.string :adjstats
      t.integer :current_hp, :null => false, :default => 100
      t.integer :current_en, :null => false, :default => 50
      t.timestamps
    end
  end

  def self.down
    drop_table :characters
  end
end
