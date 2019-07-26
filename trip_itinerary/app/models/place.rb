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

    before_validation :from_date

    private

    def from_date
        self.errors.add(:from_date, "cannot be empty") if from_date.blank?
    end
end
