class AddNotNullToTables < ActiveRecord::Migration[7.0]
  def change
    change_column_null :cart_items, :user_id, false
    change_column_null :cart_items, :game_id, false
    change_column_null :library_items, :user_id, false
    change_column_null :library_items, :game_id, false
    change_column_null :wishlist_items, :user_id, false
    change_column_null :wishlist_items, :game_id, false
    change_column_null :reviews, :author_id, false
    change_column_null :reviews, :game_id, false
  end
end
