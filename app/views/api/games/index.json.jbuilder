@games.each do |game|
  json.set! game.id do
    json.extract! game, :id, :title, :image_url, :price, :release_date, :short_description, :long_description, :developer, :publiser
  end
end