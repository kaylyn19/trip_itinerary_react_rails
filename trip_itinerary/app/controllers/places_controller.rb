require 'kmeans-clusterer'
class PlacesController < ApplicationController
    def new
        @place = Place.new
    end

    def generate
        from = params[:from_date]
        to = params[:to_date]
        name = params.values[4..-4]
        name.each do |place|
            coord = Geocoder.search(place).first.coordinates
            Place.find_or_create_by(name: place, address: Geocoder.search(coord).first.address, latitude: coord[0], longitude: coord[1])
        end
        redirect_to result_path(from: from, to: to, name: name)
    end

    def result
        @from = params[:from]
        @to = params[:to]
        @duration = (DateTime.strptime(@to, '%Y-%m-%d') - DateTime.strptime(@from, '%Y-%m-%d')).to_i
        @names = params[:name]
        @plan = Hash.new(0)
        @sort_coords = [] #@sort_coords.length => total number of places to visit
        @labels = [];
        @itinerary = []

        @names.each do |name|
            if !@plan.has_key? (name)
                @plan[name] = Hash.new(0)
            end
        end

        @plan.each do |place, values|
            query_Place = Place.find_by(name: place.titleize)
            values[:coordinates] = [query_Place.latitude, query_Place.longitude]
            values[:address] = query_Place.address
            @sort_coords << @plan[place][:coordinates]
        end

        @sort_coords.sort_by(&:first).each do |coord|
            @names.each do |name|
                if @plan[name][:coordinates] == coord
                    @labels << name
                end
            end
        end

        k = @duration # number of place to visit per day
        kmeans = KMeansClusterer.run k, @sort_coords, labels: @labels, runs: 1

        kmeans.clusters.each do |cluster|
            # puts cluster.id.to_s + '. ' + cluster.points.map(&:label).join(", ") + "\t" + cluster.centroid.to_s
            @itinerary << cluster.points.map(&:label).join(", ")
        end
        predicted = kmeans.predict [[@sort_coords[0][0], @sort_coords[0][1]]] 
        # puts "\nSilhouette score: #{kmeans.silhouette.round(2)}"
    end

    private

    def place_params
        params.require(:place).permit(:name, :longitude, :latitude, :address)
    end
end