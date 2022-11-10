json.set! @review_vote.id do
  json.partial! 'review_vote', review_vote: @review_vote
end