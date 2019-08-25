class Destination < ApplicationRecord
  belongs_to :place
  belongs_to :day
  belongs_to :event
  
  validates :day_id, uniqueness: {scope: :place_id}
end
