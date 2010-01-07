require 'spec_helper'

describe Skill do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Skill.create!(@valid_attributes)
  end
end
