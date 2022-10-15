class ChangeColumnsInGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :image_url
    rename_column :games, :publiser, :publisher
    add_column :games, :main_image_url, :string, null: false
    add_column :games, :banner_image_url, :string, null: false
  end
end
