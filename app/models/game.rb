# == Schema Information
#
# Table name: games
#
#  id                :bigint           not null, primary key
#  title             :string           not null
#  price             :float            not null
#  release_date      :date             not null
#  short_description :text             not null
#  long_description  :text             not null
#  developer         :string           not null
#  publisher         :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  main_image_url    :string           not null
#  banner_image_url  :string           not null
#  image_urls        :text             default([]), is an Array
#  small_image_url   :string           default(""), not null
#
class Game < ApplicationRecord
  validates_presence_of :title, :price, :release_date, :short_description, :long_description, :developer, :publisher, :main_image_url, :banner_image_url

  has_many :cart_items,
    dependent: :destroy
  # has_many :shoppers,
  #   through: :cart_items,
  #   source: :user
  
  has_many :library_items
  has_many :owners,
    through: :library_items,
    source: :user

  has_many :reviews

  def average_score
    num_positive = reviews.count {|review| review.recommended} * 100.0
    (num_positive / num_reviews)
  end

  def num_reviews
    reviews.length
  end
end
