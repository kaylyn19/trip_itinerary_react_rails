class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :days, dependent: :destroy
  # validates :name, presence: true, uniqueness: true
end
