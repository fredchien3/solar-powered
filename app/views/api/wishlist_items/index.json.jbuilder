if @wishlist_items.length > 0
  @wishlist_items.each do |wishlist_item|
    json.wishlist_items do
      json.set! wishlist_item.id do
        json.partial! 'wishlist_item', wishlist_item: wishlist_item
      end
    end

    json.games do
      json.set! wishlist_item.game.id do
        json.partial! 'api/games/game', game: wishlist_item.game
      end
    end
  end
else
  json.wishlist_items({})
  json.games({})
end