json.set! @game.id do
  json.partial! 'game', game: @game
end