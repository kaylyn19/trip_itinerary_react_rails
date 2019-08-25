class Destination < ApplicationRecord
  belongs_to :place
  belongs_to :day
  
  validates :day_id, uniqueness: {scope: :place_id}
end
