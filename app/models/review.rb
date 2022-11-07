# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  game_id     :bigint           not null
#  body        :text             not null
#  recommended :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
  validates_presence_of :author_id, :game_id, :body
  validates :recommended, inclusion: { in: [true, false] }
  validates :author_id, uniqueness: { scope: :game_id, message: 'has already reviewed this game' }
  
  belongs_to :author,
    class_name: :User

  belongs_to :game
end
