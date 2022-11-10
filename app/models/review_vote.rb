# == Schema Information
#
# Table name: review_votes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  review_id  :bigint           not null
#  value      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ReviewVote < ApplicationRecord
  validates_presence_of :user_id, :review_id
  validates :value, inclusion: { in: ["yes", "no", "funny"] }

  belongs_to :review
end
