require 'spec_helper'

describe Workplace do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Workplace.create!(@valid_attributes)
  end
end
