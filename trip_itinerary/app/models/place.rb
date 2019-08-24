class Place < ApplicationRecord
    has_many :destinations, dependent: :destroy
    has_many :days, through: :destinations
    validates :name, presence: true, uniqueness: {case_sensitive: false}
    validates :latitude, :longitude, :latitude, presence: true
    geocoded_by :name
    after_validation :geocode
    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode

    before_validation :titleize
    private

    def titleize
        self.name = name.titleize
    end

end
