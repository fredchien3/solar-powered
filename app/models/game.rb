# == Schema Information
#
# Table name: games
#
#  id                :bigint           not null, primary key
#  title             :string           not null
#  image_url         :string
#  price             :float            not null
#  release_date      :date             not null
#  short_description :text             not null
#  long_description  :text             not null
#  developer         :string           not null
#  publiser          :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Game < ApplicationRecord
  validates_presence_of :title, :price, :release_date, :short_description, :long_description, :developer, :publiser
end
