json.set! @cart_item.id do
  json.partial! 'cart_item', cart_item: @cart_item
end