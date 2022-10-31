class Api::LibraryItemsController < ApplicationController
  before_action :require_logged_in, only: [:create]
  
  def create
    @library_item = LibraryItem.new(user_id: current_user.id, game_id: params[:game_id])
    if @library_item.save!
      render 'api/library_items/show'
    else
      render json: { errors: ['ERROR - library items controller'] }, status: :unauthorized
    end
  end

  def index
    @library_items = LibraryItem.includes(:game, :user).where(user_id: params[:user_id])
    render 'api/library_items/index'
  end

end