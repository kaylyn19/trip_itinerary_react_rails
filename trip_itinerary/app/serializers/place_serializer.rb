class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :longitude, :latitude, :address

  # has_many :days, through: :destinations
end
