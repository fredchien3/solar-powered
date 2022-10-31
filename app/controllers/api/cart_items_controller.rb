class Api::CartItemsController < ApplicationController
  before_action :require_logged_in
  
  def create
    @cart_item = CartItem.new(user_id: current_user.id, game_id: params[:game_id])
    if @cart_item.save!
      render 'api/cart_items/show'
    else
      render json: { errors: ['ERROR - cart items controller'] }, status: :unauthorized
    end
  end

  def index
    @cart_items = CartItem.includes(:game, :user).where(user_id: current_user.id)
    render 'api/cart_items/index'
  end

  def destroy
    @cart_item = CartItem.find(params[:id])
    @cart_item.destroy if @cart_item
    render json: { message: 'success' } 
  end
end
