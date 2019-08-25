class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :labels, :start, :end, :address
end
