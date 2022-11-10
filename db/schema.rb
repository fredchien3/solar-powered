# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_10_164559) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cart_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_cart_items_on_game_id"
    t.index ["user_id", "game_id"], name: "index_cart_items_on_user_id_and_game_id", unique: true
    t.index ["user_id"], name: "index_cart_items_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "title", null: false
    t.float "price", null: false
    t.date "release_date", null: false
    t.text "short_description", null: false
    t.text "long_description", null: false
    t.string "developer", null: false
    t.string "publisher", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "main_image_url", null: false
    t.string "banner_image_url", null: false
    t.text "image_urls", default: [], array: true
    t.string "small_image_url", default: "", null: false
    t.index ["developer"], name: "index_games_on_developer"
    t.index ["publisher"], name: "index_games_on_publisher"
    t.index ["title"], name: "index_games_on_title"
  end

  create_table "library_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_library_items_on_game_id"
    t.index ["user_id", "game_id"], name: "index_library_items_on_user_id_and_game_id", unique: true
    t.index ["user_id"], name: "index_library_items_on_user_id"
  end

  create_table "review_votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "review_id", null: false
    t.string "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["review_id"], name: "index_review_votes_on_review_id"
    t.index ["user_id", "review_id"], name: "index_review_votes_on_user_id_and_review_id", unique: true
    t.index ["user_id"], name: "index_review_votes_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.bigint "game_id", null: false
    t.text "body", null: false
    t.boolean "recommended", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id", "game_id"], name: "index_reviews_on_author_id_and_game_id", unique: true
    t.index ["author_id"], name: "index_reviews_on_author_id"
    t.index ["game_id"], name: "index_reviews_on_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "display_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_users_on_display_name", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "wishlist_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_wishlist_items_on_game_id"
    t.index ["user_id", "game_id"], name: "index_wishlist_items_on_user_id_and_game_id", unique: true
    t.index ["user_id"], name: "index_wishlist_items_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cart_items", "games"
  add_foreign_key "cart_items", "users"
  add_foreign_key "library_items", "games"
  add_foreign_key "library_items", "users"
  add_foreign_key "review_votes", "reviews"
  add_foreign_key "review_votes", "users"
  add_foreign_key "reviews", "games"
  add_foreign_key "reviews", "users", column: "author_id"
  add_foreign_key "wishlist_items", "games"
  add_foreign_key "wishlist_items", "users"
end
