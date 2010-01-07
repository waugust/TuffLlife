class InventoriesItems < ActiveRecord::Migration
  def self.up
    create_table :inventories_items, :id => false do |t|
      t.references :inventory
      t.references :item
    end
  end

  def self.down
    drop_table :inventories_items
  end
end
