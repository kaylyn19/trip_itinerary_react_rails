class Place < ApplicationRecord
    has_many :destinations, dependent: :nullify
    has_many :days, through: :destinations
    validates :name, presence: true, uniqueness: {case_sensitive: false}
    validates :latitude, :longitude, :latitude, presence: true
    geocoded_by :name
    after_validation :geocode

    before_validation :titleize
    private

    def titleize
        self.name = name.titleize
    end

end
