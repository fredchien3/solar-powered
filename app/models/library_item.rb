# == Schema Information
#
# Table name: library_items
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  game_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class LibraryItem < ApplicationRecord
  validates :user_id, uniqueness: { scope: :game_id, message: 'already owns this game' }
  
  belongs_to :user
  belongs_to :game
end
