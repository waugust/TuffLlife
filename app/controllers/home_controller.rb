class HomeController < ApplicationController
  def index
    @character = Character.find(1)
  end
  def skills
    @character = Character.find(params[:character])
    render :json => @character.skills
  end
  def vitals
    @character = Character.find(params[:character])
    vitalshash={}
    vitalshash["health"]={:current=>@character.current_hp,:max=>@character.adjstats["health"]}
    vitalshash["energy"]={:current=>@character.current_en,:max=>@character.adjstats["energy"]}
    render :json => vitalshash
  end
end
