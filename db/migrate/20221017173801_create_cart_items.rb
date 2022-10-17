class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.references :user, foreign_key: true
      t.references :game, foreign_key: true
      
      t.timestamps
    end
    add_index :cart_items, [:user_id, :game_id], unique: true
  end
end
