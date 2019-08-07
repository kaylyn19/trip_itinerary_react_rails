require 'kmeans-clusterer'

class Api::V1::ItinerariesController < Api::ApplicationController
    before_action :authenticate!, only: [:create]
    def create
        success = true
        # render json: params
        itinerary = Itinerary.new itinerary_params
        itinerary.user = current_user
        if !itinerary.save
            success = false
        end

        places = params[:itinerary][:places]
        maps_info = []
        data = []
        labels = []
        each_day = []

        places.each do |place|
            coord = Geocoder.search(place).first.coordinates
            Place.find_or_create_by(name: place, address: Geocoder.search(coord).first.address, latitude: coord[0], longitude: coord[1])
            # maps_info[place] = coord
            maps_info << [place, coord] # ["central park", [x, y]]
        end
        from = DateTime.strptime(params[:itinerary][:start], '%Y-%m-%d')#itinerary.start
        to = DateTime.strptime(params[:itinerary][:end], '%Y-%m-%d')

        duration = (to - from).to_i
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


        k = duration # number of place to visit per day
        kmeans = KMeansClusterer.run k, data, labels: labels, runs: 10

        kmeans.clusters.each do |cluster|
            # puts cluster.id.to_s + '. ' + cluster.points.map(&:label).join(", ") + "\t" + cluster.centroid.to_s
            each_day << cluster.points.map(&:label).join(",")
        end
        predicted = kmeans.predict [data[0]] 

        each_day.each.with_index do |day, index|
            split_site = day.split(',')
            split_site.each do |site|
                destination = Destination.new(
                    day_id: Day.where(itinerary_id: itinerary.id)[index].id, #do it again
                    place_id: Place.find_by(name: site.titleize).id 
                    )
                    if !destination.save
                        success = false
                    end
            end
        end

        if success
            render json: {status: 200, id: itinerary.id}, status: 200
        else
            render json: {error: "Error!!!!!!"}, status: 400
        end
    end

    def show
        itinerary = Itinerary.find params[:id]
        render json: itinerary, include: '**'
    end

    private

    def itinerary_params
        params.require(:itinerary).permit(:name, :start, :end)
    end
end
