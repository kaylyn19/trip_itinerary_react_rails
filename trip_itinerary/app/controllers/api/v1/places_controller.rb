class Api::V1::PlacesController < Api::ApplicationController
    # before_action :authenticate!
    def create
        results = Geocoder.search([params[:place][:latitude], params[:place][:longitude]])
        place = Place.new(
            name: params[:place][:name],
            longitude: params[:place][:longitude],
            latitude: params[:place][:latitude],
            address: results.first.address,
        )
            
        byebug
        if place.save
            render json: {id: place.id, status: 200}, status: 200
        else
            render json: {errors: place.errors.full_messages}, status: 422
        end
    end
end
