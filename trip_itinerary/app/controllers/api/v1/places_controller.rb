class Api::V1::PlacesController < Api::ApplicationController
    def show
        place = Place.find_by(name: params[:name])
        if place
            render json: place, status: 200
        else
            render json: {errors: "unable to display render place"}, status: 422
        end
    end
end
