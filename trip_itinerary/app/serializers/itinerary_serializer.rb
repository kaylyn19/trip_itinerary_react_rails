class ItinerarySerializer < ActiveModel::Serializer
  attributes :id, :name, :start, :end

  has_many :days#include_nested_associations: true#, serializer: DaySerializer
  
end
