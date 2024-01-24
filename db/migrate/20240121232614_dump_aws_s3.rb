class DumpAwsS3 < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :main_image_url, :string
    remove_column :games, :banner_image_url, :string
    remove_column :games, :small_image_url, :string
    remove_column :games, :image_urls, :text, array: true

    add_column :games, :name, :string, after: :id, null: false, default: ""
  end
end
