json.review do
  json.set! @review.id do
    json.partial! 'review', review: @review
  end
end

json.user do
  json.set! @review.author_id do
    json.extract! @author, :id, :email, :username, :display_name
    json.num_owned_games @author.owned_games.length 
    json.num_reviews @author.reviews.length 
  end
end