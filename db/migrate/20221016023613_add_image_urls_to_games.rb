class AddImageUrlsToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :image_urls, :text, array: true, default: []
  end
end
