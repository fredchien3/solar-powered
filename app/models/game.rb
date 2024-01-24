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
#  name              :string           default(""), not null
#
class Game < ApplicationRecord
  validates_presence_of :title, :price, :release_date, :short_description, :long_description, :developer, :publisher

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

  def main_image_url
    "/images/#{self.name}/#{self.name}-main.jpg"
  end

  def banner_image_url
    "/images/#{self.name}/#{self.name}-banner.jpg"
  end

  def small_image_url
    "/images/#{self.name}/#{self.name}-small.jpg"
  end

  def image_urls
    filenames = Dir.entries("./frontend/public/images/#{self.name}")
      .sort_by{ |filename| filename.split('-').last.to_i }
    urls = filenames
      .select {|file| file.match?(/#{self.name}-\d+/)}
      .map {|filename| "/images/#{self.name}/#{filename}"}
  end
end
