class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.string :image_url
      t.float :price, null: false
      t.date :release_date, null: false
      t.text :short_description, null: false
      t.text :long_description, null: false
      t.string :developer, null: false
      t.string :publiser, null: false

      t.timestamps
    end
    add_index :games, :title
    add_index :games, :developer
    add_index :games, :publiser
  end
end
