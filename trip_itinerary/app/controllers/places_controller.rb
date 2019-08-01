require 'kmeans-clusterer'
class PlacesController < ApplicationController
    before_action :authenticate!

    def new
    end

    def generate
        from = DateTime.strptime(params[:from_date], '%Y-%m-%d') #params[:from_date]
        to = DateTime.strptime(params[:to_date], '%Y-%m-%d') #params[:to_date]
        byebug
        @duration = (to - from).to_i#(DateTime.strptime(@to, '%Y-%m-%d') - DateTime.strptime(@from, '%Y-%m-%d')).to_i
        names = params.values[5..-4]
        trip_name = params[:name_of_trip]
        @itinerary = Itinerary.new(name: trip_name, user_id: current_user.id)
        return render :new, alert: "Your trip already exists" unless @itinerary.save

        for day in 0...@duration
            @day = Day.new(
                from_date: from + day,
                to_date: from + day + 1,
                itinerary_id: @itinerary.id
            )
            p "@day saved" if @day.save
        end

        @trip_info = Hash.new(0)
        @sort_coords = [] #@sort_coords.length => total number of places to visit
        @labels = [];
        @each_day = []

        names.each do |place|
            # if place == ""
            #     render :new, alert: "Place must be entered!"
            # end
            coord = Geocoder.search(place).first.coordinates
            Place.find_or_create_by(name: place, address: Geocoder.search(coord).first.address, latitude: coord[0], longitude: coord[1])
        end

        names.each do |name|
            if !@trip_info.has_key? (name)
                @trip_info[name] = Hash.new(0)
            end
        end

        @trip_info.each do |place, values|
            query_Place = Place.find_by(name: place.titleize)
            values[:coordinates] = [query_Place.latitude, query_Place.longitude]
            values[:address] = query_Place.address
            @sort_coords << values[:coordinates]
        end

        @sort_coords.sort_by(&:first).each do |coord|
            names.each do |name|
                if @trip_info[name][:coordinates] == coord
                    @labels << name
                end
            end
        end

        k = @duration # number of place to visit per day
        kmeans = KMeansClusterer.run k, @sort_coords.sort_by(&:first), labels: @labels, runs: 10

        kmeans.clusters.each do |cluster|
            # puts cluster.id.to_s + '. ' + cluster.points.map(&:label).join(", ") + "\t" + cluster.centroid.to_s
            @each_day << [cluster.points.map(&:label).join(", ")]
        end
        predicted = kmeans.predict [[@sort_coords[0][0], @sort_coords[0][1]]] 
        # puts "\nSilhouette score: #{kmeans.silhouette.round(2)}"

        # for index in 0...@each_day.length
        #     @destination = Destination.new(
        #         from_date: from + index, 
        #         to_date: from + index + 1, 
        #         itinerary_id: @itinerary.id,
        #         place_id: 
        #         @each_day[index].itineraryeach do |day|
        #             day.each do |site|
        #                 Place.find_by(name: site.titleize).id
        #             end
        #         end
        #     )
        #     @destination.save
        # end

        redirect_to root_path #result_path(from: from, to: to, name: names, trip_name: trip_name)
    end

    def result
    end

    private
    
    def find_place(labels)
        labels.each do |day|
            day.each do |place|
                Place.find_by(name: place).id
            end
        end
    end
end