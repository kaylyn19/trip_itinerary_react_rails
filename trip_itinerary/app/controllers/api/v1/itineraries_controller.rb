require 'kmeans-clusterer'

class Api::V1::ItinerariesController < Api::ApplicationController
    before_action :authenticate!
    def create
        # render json: params
        itinerary = Itinerary.new itinerary_params
        itinerary.user = current_user
        success = true
        if !itinerary.save
            success = false
        end

        places = params[:places]
        puts "places: #{places}"
        puts params
        maps_info = []
        data = []
        labels = []
        each_day = []

        places.each do |place|
            coord = Geocoder.search(place[:name]).first.coordinates
            Place.find_or_create_by(name: place[:name], address: Geocoder.search(coord).first.address, latitude: coord[0], longitude: coord[1])
            # maps_info[place[:name]] = coord
            maps_info << [place[:name], coord] # ["central park", [x, y]]
        end
        p "maps_info #{maps_info}"
        from = DateTime.strptime(params[:itinerary][:start], '%Y-%m-%d')#itinerary.start
        to = DateTime.strptime(params[:itinerary][:end], '%Y-%m-%d')
        puts "from is #{from}"
        puts "to is #{to}"

        duration = (to - from).to_i
        puts "duration is #{duration}"
        for day in 0...duration
            day = Day.new(
                from_date: from + day,
                to_date: from + day + 1,
                itinerary_id: itinerary.id
            )
            if !day.save
                success = false
            end
        end

        sort_coords = maps_info.sort_by{|place| place[1][0]} # sort by latitude
        sort_coords.each do |place|
            labels << place[0]
            data << place[1]
        end

        p "sort_coords : #{sort_coords}"

        k = duration # number of place to visit per day
        kmeans = KMeansClusterer.run k, data, labels: labels, runs: 10

        kmeans.clusters.each do |cluster|
            # puts cluster.id.to_s + '. ' + cluster.points.map(&:label).join(", ") + "\t" + cluster.centroid.to_s
            each_day << cluster.points.map(&:label).join(",")
        end
        predicted = kmeans.predict [data[0]] 
        p "each day is #{each_day}"

        each_day.each.with_index do |day, index|
            split_site = day.split(',')
            p "split_site is #{split_site}"
            split_site.each do |site|
                p "site is #{site}"
                destination = Destination.new(
                    day_id: Day.where(itinerary_id: itinerary.id)[index].id, #do it again
                    place_id: Place.find_by(name: site.titleize).id 
                    )
                    if !destination.save
                        success = false
                    end
            end
        end













        # from = DateTime.strptime(params[:place][:from_date], '%Y-%m-%d') 
        # to = DateTime.strptime(params[:place][:to_date], '%Y-%m-%d') 
        # duration = (to - from).to_i
        # names = params[]#params.values[5..-4]
        # trip_name = params[:name_of_trip]
        # itinerary = Itinerary.new(name: trip_name, user_id: current_user.id)
        # if itinerary.save
        #     render json: {id: itinerary.id}, status: 200 
        # else
        #     render json: {error: itinerary.errors}, status: 422
        # end
        # #JSON.parse(request.body.read)
        # for day in 0...duration
        #     day = Day.new(
        #         from_date: from + day,
        #         to_date: from + day + 1,
        #         itinerary_id: itinerary.id,
        #     )
        #     if day.save
        #         render json: {id: day.id}, status: 200 
        #     else
        #         render json: {error: day.errors}, status: 422
        #     end
        # end

        # @trip_info = Hash.new(0)
        # sort_coords = [] #sort_coords.length => total number of places to visit
        # labels = [];
        # each_day = []

        # names.each do |place|
        #     coord = Geocoder.search(place).first.coordinates
        #     Place.find_or_create_by(name: place, address: Geocoder.search(coord).first.address, latitude: coord[0], longitude: coord[1])
        # end

        # names.each do |name|
        #     if !@trip_info.has_key? (name)
        #         @trip_info[name] = Hash.new(0)
        #     end
        # end

        # @trip_info.each do |place, values|
        #     query_Place = Place.find_by(name: place.titleize)
        #     values[:coordinates] = [query_Place.latitude, query_Place.longitude]
        #     values[:address] = query_Place.address
        #     sort_coords << values[:coordinates]
        # end

        # sort_coords.sort_by(&:first).each do |coord|
        #     names.each do |name|
        #         if @trip_info[name][:coordinates] == coord
        #             labels << name
        #         end
        #     end
        # end

        # k = duration # number of place to visit per day
        # kmeans = KMeansClusterer.run k, sort_coords.sort_by(&:first), labels: labels, runs: 10

        # kmeans.clusters.each do |cluster|
        #     # puts cluster.id.to_s + '. ' + cluster.points.map(&:label).join(", ") + "\t" + cluster.centroid.to_s
        #     each_day << cluster.points.map(&:label).join(",")
        # end
        # predicted = kmeans.predict [[sort_coords[0][0], sort_coords[0][1]]] 
        # # puts "\nSilhouette score: #{kmeans.silhouette.round(2)}"

        # each_day.each.with_index do |day, index|
        #     split_site = day.split(',')
        #     split_site.each do |site|
        #         destination = Destination.new(
        #             day_id: Day.where(itinerary_id: itinerary.id)[index].id, #do it again
        #             place_id: Place.find_by(name: site.titleize).id 
        #             )
        #             if destination.save
        #                 render json: {id: destination.id}, status: 200 
        #             else
        #                 render json: {error: destination.errors}, status: 422
        #             end
        #     end
        # end

        # redirect_to itinerary_path(itinerary, name: names), notice: "Itinerary successfully created!" 
        if success
            render json: {status: 200, id: itinerary.id}, status: 200
        else
            render json: {error: "Error!!!!!!"}, status: 400
        end
    end

    private

    def itinerary_params
        params.require(:itinerary).permit(:name, :start, :end)
    end


end
