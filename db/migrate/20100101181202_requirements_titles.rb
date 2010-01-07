class RequirementsTitles < ActiveRecord::Migration
  def self.up
    create_table :requirements_titles, :id => false do |t|
      t.references :requirement
      t.references :title
    end
  end

  def self.down
    drop_table :requirements_titles
  end
end