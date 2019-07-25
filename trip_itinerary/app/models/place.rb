class Place < ApplicationRecord
    validates :name, presence: true, uniqueness: {case_sensitive: false}
    # validates :latitude, :longitude, :latitude, presence: true

    # custom methods
    # def add_place
    # end
end
