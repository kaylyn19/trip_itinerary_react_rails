
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
        @duration = (DateTime.strptime(@to, '%Y-%m-%d') - DateTime.strptime(@from, '%Y-%m-%d')).to_i
        @names = params[:name]
        @plan = Hash.new(0)
        @sort_coords = [];

        @names.each do |name|
            if !@plan.has_key? (name)
                @plan[name] = Hash.new(0)
            end
        end

        @plan.each do |place, values|
            @plan[place][:coordinates] = Geocoder.search(place).first.coordinates
            @plan[place][:address] = Geocoder.search(@plan[place][:coordinates]).first.address
            @sort_coords << @plan[place][:coordinates]
        end

        @sort_coords.sort_by(&:first).each do |coord|
            @names.each do |name|
                if @plan[name][:coordinates] == coord
                    # p @plan[name]
                end
            end
        end
    end

    private

    def place_params
        params.require(:place).permit(:name, :longitude, :latitude, :address)
    end

    # def distance(coords_collection)
    #     coords = coords_collection.sort_by(&:first)
    #     coords.each do |coord|
    #         dist_between = Geocoder::Calculations.distance_between(coords[0], coord)
    #     end
    # end
end