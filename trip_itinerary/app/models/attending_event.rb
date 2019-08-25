class AttendingEvent < ApplicationRecord
  belongs_to :event
  belongs_to :day

  validates :day_id, uniqueness: {scope: :event_id}
end
