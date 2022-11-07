class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :author, foreign_key: {to_table: :users}
      t.references :game, foreign_key: true
      t.text :body, null: false
      t.boolean :recommended, null: false

      t.timestamps
    end
  end
end
