require 'spec_helper'

describe Drug do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Drug.create!(@valid_attributes)
  end
end
