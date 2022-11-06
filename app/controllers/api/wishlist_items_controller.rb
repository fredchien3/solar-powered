class Api::WishlistItemsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    @wishlist_item = WishlistItem.new(user_id: current_user.id, game_id: params[:game_id])
    if @wishlist_item.save!
      render 'api/wishlist_items/show'
    else
      render json: { errors: ['ERROR - wishlist items controller'] }, status: :unauthorized
    end
  end
  
  def index
    @wishlist_items = WishlistItem.includes(:game, :user).where(user_id: params[:user_id])
    render 'api/wishlist_items/index'
  end

  def destroy
    @wishlist_item = WishlistItem.find(params[:id])
    @wishlist_item.destroy if @wishlist_items
    render json: { message: 'success' }
end
