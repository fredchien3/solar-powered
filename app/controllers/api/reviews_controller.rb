class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]
  
  def index
    @reviews = Review.includes(:author).where(game_id: params[:game_id])
    render 'api/reviews/index'
  end

  def create
    @review = Review.new(review_params)
    @review.game_id = params[:game_id]
    @review.author_id = current_user.id
    if @review.author.owns?(@review.game)
      if @review.save!
        render 'api/reviews/show'
        else
          render json: { errors: @review.errors.full_messages }, status: :unauthorized
        end
    else
      render json: { errors: ["You must own a game to review it."]}, status: :unauthorized
    end
    

  end

  def update
    @review = Review.find(params[:id])
    @review.assign_attributes(review_params)
    
    if @review.save!
      render 'api/reviews/show'
    else
      render json: { errors: @review.errors.full_messages }, status: :unauthorized
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy if @review
    render json: { message: 'success' } 
  end

  def review_params
    params.require(:review).permit(:body, :recommended)
  end
end
