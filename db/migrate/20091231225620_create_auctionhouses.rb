class CreateAuctionhouses < ActiveRecord::Migration
  def self.up
    create_table :auctionhouses do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :auctionhouses
  end
end
