class DaySerializer < ActiveModel::Serializer
  attributes :id, :from_date, :to_date
  has_many :places, through: :destinations

end
