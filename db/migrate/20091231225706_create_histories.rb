class CreateHistories < ActiveRecord::Migration
  def self.up
    create_table :histories do |t|
      t.integer :origid
      t.string :event_action
      t.string :targetid
      t.timestamps
    end
  end

  def self.down
    drop_table :histories
  end
end
