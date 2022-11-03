@cart_items.each do |cart_item|

  json.cart_items do
    json.set! cart_item.id do
      json.partial! 'cart_item', cart_item: cart_item
    end
  end

  json.games do
    json.set! cart_item.game.id do
      json.partial! 'api/games/game', game: cart_item.game
    end
  end
end