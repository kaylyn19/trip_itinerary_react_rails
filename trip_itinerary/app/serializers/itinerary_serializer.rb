class ItinerarySerializer < ActiveModel::Serializer
  attributes :id, :name, :start, :end, :user_id

  has_many :days#include_nested_associations: true#, serializer: DaySerializer
  belongs_to :user
end
