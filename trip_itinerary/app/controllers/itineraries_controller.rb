class ItinerariesController < ApplicationController
    def show
        @itinerary = Itinerary.find params[:id]
        @from = @itinerary.days[0].from_date
        @to = @itinerary.days[-1].to_date
        @sites = params[:name]
        @maps_info = []


        @sites.each do |site|
            name = site.titleize
            lat = Place.find_by(name: name).latitude
            lng = Place.find_by(name: name).longitude
            @maps_info << [name, lat, lng]
        end
    end
end
