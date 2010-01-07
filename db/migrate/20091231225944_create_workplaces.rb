class CreateWorkplaces < ActiveRecord::Migration
  def self.up
    create_table :workplaces do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :workplaces
  end
end
