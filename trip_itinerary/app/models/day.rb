class Day < ApplicationRecord
  belongs_to :itinerary
  has_many :destinations, dependent: :destroy
  has_many :places, through: :destinations
  has_many :attending_events, dependent: :destroy
  has_many :events, through: :attending_events

  validates :from_date, :to_date, presence: true

  before_validation :duration
  
  private

  def duration
    return unless to_date.present? && from_date.present?
    self.errors.add(:from_date, "must come before to_date") unless from_date < to_date
  end

end
