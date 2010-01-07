class CreateRequirements < ActiveRecord::Migration
  def self.up
    create_table :requirements do |t|
      t.integer :level
      t.string :kind
      t.string :req
      t.timestamps
    end
  end

  def self.down
    drop_table :requirements
  end
end
