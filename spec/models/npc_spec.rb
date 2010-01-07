require 'spec_helper'

describe Npc do
  before(:each) do
    @valid_attributes = {
      
    }
  end

  it "should create a new instance given valid attributes" do
    Npc.create!(@valid_attributes)
  end
end
