json.extract! cart_item, :id, :user_id
game = cart_item.game
json.game do
  json.id game.id
  json.title game.title
  json.small_image_url game.small_image_url
  json.price game.price
end