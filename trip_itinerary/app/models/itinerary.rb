class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :destinations, dependent: :nullify
  validates :name, presence: true, uniqueness: true
end
