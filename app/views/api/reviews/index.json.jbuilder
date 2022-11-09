# @reviews.each do |review|
#   json.set! review.id do
#     json.partial! 'review', review: review
#   end
# end

if @reviews.length > 0
  @reviews.each do |review|
    json.reviews do
      json.set! review.id do
        json.partial! 'review', review: review
      end
    end

    json.users do
      json.set! review.author_id do
        json.extract! review.author, :id, :email, :username, :display_name
        json.num_owned_games review.author.owned_games.length 
        json.num_reviews review.author.reviews.length 
      end
    end
  end
else
  json.reviews({})
  json.users({})
end