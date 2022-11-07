# == Schema Information
#
# Table name: wishlist_items
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  game_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class WishlistItem < ApplicationRecord
  validates :user_id, uniqueness: { scope: :game_id, message: 'has already wishlisted this game' }

  belongs_to :user
  belongs_to :game
end
