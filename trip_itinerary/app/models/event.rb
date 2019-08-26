class Event < ApplicationRecord
    has_many :attending_events, dependent: :destroy
    has_many :days, through: :attending_events
    
    validates :name, presence: true, uniqueness: {case_sensitive: false}

    geocoded_by :name
    after_validation :geocode
    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode

end
