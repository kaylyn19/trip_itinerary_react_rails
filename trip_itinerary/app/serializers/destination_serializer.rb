class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :day_id, :place_id

  belongs_to :day
  belongs_to :place
end
