require 'spec_helper'

describe Weapon do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Weapon.create!(@valid_attributes)
  end
end
