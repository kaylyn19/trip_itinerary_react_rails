class PlacesController < ApplicationController
    def new
        @place = Place.new
    end

    def generate
        from = params[:from_date]
        to = params[:to_date]
        name = params.values[4..-4]
        redirect_to result_path(from: from, to: to, name: name)
    end

    def result
        @from = params[:from]
        @to = params[:to]
        @names = params[:name]
        coords_collection = [];
        addresses = []
;
        @names.each do |name|
            coords = Geocoder.search(name)
            coords_collection << coords.first.coordinates
        end

        coords_collection.each do |coord|
            address = Geocoder.search(coord)
            addresses << address.first.address
        end
    end

    private

    def place_params
        params.require(:place).permit(:name, :longitude, :latitude, :address)
    end
end