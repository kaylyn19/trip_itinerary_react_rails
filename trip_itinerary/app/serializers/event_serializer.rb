class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :labels, :start, :end, :address

  has_many :days, through: :destinations
end
