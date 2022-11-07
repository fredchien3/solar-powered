json.set! @wishlist_item.id do
  json.partial! 'wishlist_item', wishlist_item: @wishlist_item
end