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
#
class Game < ApplicationRecord
  validates_presence_of :title, :price, :release_date, :short_description, :long_description, :developer, :publisher, :main_image_url, :banner_image_url
end
