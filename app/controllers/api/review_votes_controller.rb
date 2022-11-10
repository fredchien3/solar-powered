class Api::ReviewVotesController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]
  wrap_parameters include: ReviewVote.attribute_names + ["reviewId"]

  def create
    @review_vote = ReviewVote.new(review_vote_params)
    @review_vote.user_id = current_user.id
    if @review_vote.save!
      render :show
    else
      render json: { errors: @review_vote.errors.full_mesasges }
    end
  end

  def update
    @review_vote = ReviewVote.find(params[:id])
    @review_vote.assign_attributes(review_vote_params)
    
    if @review_vote.save!
      render :show
    else
      render json: { errors: @review_vote.errors.full_mesasges }
    end
  end

  def destroy
    @review_vote = ReviewVote.find(params[:id])
    @review_vote.destroy if @review_vote
    render json: { message: 'Success' }
  end

  def review_vote_params
    params.require(:review_vote).permit(:review_id, :value)
  end
end
