@library_items.each do |library_item|
  json.library_items do
    json.set! library_item.id do
      json.partial! 'library_item', library_item: library_item
    end
  end

  json.games do
    json.set! library_item.game.id do
      json.partial! 'api/games/game', game: library_item.game
    end
  end
end