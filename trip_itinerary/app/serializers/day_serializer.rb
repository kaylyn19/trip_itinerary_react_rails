class DaySerializer < ActiveModel::Serializer
  attributes :id, :from_date, :to_date, :itinerary_id
  has_many :places, through: :destinations
  has_many :events, through: :attending_events

end
