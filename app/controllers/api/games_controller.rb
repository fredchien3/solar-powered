class Api::GamesController < ApplicationController
  def index
    @games = Game.all
    render 'api/games/index'
  end

  def show
    @game = Game.find(params[:id])
    render 'api/games/show'
  end
end
