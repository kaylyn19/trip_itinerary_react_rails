class Place < ApplicationRecord
    validates :name, presence: true, uniqueness: {case_sensitive: false}
    # validates :latitude, :longitude, :latitude, presence: true
    geocoded_by :name
    after_validation :geocode

    # reverse_geocoded_by :latitude, :longitude
    # after_validation :reverse_geocode


    # custom methods
    # def add_place
    # end

end
