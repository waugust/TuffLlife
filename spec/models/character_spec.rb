require 'spec_helper'

describe Character do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Character.create!(@valid_attributes)
  end
end
