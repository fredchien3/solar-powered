class AddUniquenessToReviews < ActiveRecord::Migration[7.0]
  def change
    add_index :reviews, [:author_id, :game_id], unique: true
  end
end
