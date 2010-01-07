require 'spec_helper'

describe Container do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Container.create!(@valid_attributes)
  end
end
