json.extract! cart_item, :id, :user_id
json.game do
  json.title cart_item.game.title
  json.small_image_url cart_item.game.small_image_url
  json.price cart_item.game.price
end