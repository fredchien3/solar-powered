json.review do
  json.set! @review.id do
    json.partial! 'review', review: @review
  end
end

json.user do
  json.set! @review.author_id do
    json.extract! @review.author, :id, :email, :username, :display_name
    json.num_owned_games @review.author.owned_games.length 
    json.num_reviews @review.author.reviews.length 
  end
end

if @review.review_votes.length > 0
  json.review_votes do
    json.set! review.id do
      review.review_votes.each do |review_vote|
        json.set! review_vote.id do
          json.partial! 'api/review_votes/review_vote', review_vote: review_vote
        end
      end
    end
  end
else 
  json.review_votes({})
end