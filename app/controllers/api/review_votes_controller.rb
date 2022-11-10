class Api::ReviewVotesController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def create
    @review_vote = ReviewVote.new(review_vote_params)
    @review_vote.user = current_user
    if @review_vote.save!
      render json: { @review_vote.id: @review_vote }
    else
      render json: { errors: @review_vote.errors.full_mesasges }
    end
  end

  def update
    @review_vote = ReviewVote.find(params[:id])
    @review_vote.assign_attributes(review_vote_params)
    
    if @review_vote.save!
      render json: { @review_vote.id: @review_vote }
    else
      render json: { errors: @review_vote.errors.full_mesasges }
    end
  end

  def destroy
    @review_vote = ReviewVote.find(params[:id])
    @review_vote.destroy if @review
    render json: { message: 'Success' }
  end

  def review_vote_params
    params.require(:review_vote).permit(:review_id, :value)
  end
end
