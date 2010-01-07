class BanksItems < ActiveRecord::Migration
  def self.up
    create_table :banks_items, :id => false do |t|
      t.references :bank
      t.references :item
    end
  end

  def self.down
    drop_table :banks_items
  end
end
