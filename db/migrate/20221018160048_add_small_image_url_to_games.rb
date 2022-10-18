class AddSmallImageUrlToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :small_image_url, :string, null: false, default: ""
  end
end
