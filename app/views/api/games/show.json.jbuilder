json.set! @game.id do
  json.extract! @game, :id, :image_url, :price, :release_date, :short_description, :long_description, :developer, :publiser
end