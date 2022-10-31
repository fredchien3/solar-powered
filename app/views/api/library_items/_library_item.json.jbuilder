json.extract! library_item, :id, :user_id
game = library_item.game
json.game do
  json.id game.id
  json.title game.title
  json.small_image_url game.small_image_url
end