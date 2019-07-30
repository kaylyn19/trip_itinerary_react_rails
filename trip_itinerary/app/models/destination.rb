class Destination < ApplicationRecord
  belongs_to :place
  belongs_to :itinerary
  
  validates :from_date, :to_date, presence: true
  validates :itinerary_id, uniqueness: {scope: :place_id}
  before_validation :duration
  private

  def duration
    return unless to_date.present? && from_date.present?
    self.errors.add(:from_date, "must come before to_date") unless from_date < to_date
  end
end
