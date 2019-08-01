class Day < ApplicationRecord
  belongs_to :itinerary
  has_many :destinations, dependent: :destroy
  has_many :places, through: :destinations

  validates :from_date, :to_date, presence: true
end
