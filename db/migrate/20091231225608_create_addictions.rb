class CreateAddictions < ActiveRecord::Migration
  def self.up
    create_table :addictions do |t|
      t.string :drug
      t.integer :degree
      t.datetime :last_used
      t.integer :tolerance
      t.timestamps
    end
  end

  def self.down
    drop_table :addictions
  end
end
