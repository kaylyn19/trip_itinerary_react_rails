class ItinerariesController < ApplicationController
    before_action :authenticate!
    def create
        @itinerary = Itinerary.new itinerary_params
        @itinerary.user = current_user
        
    end

    private

    def itinerary_params
        params.require(:itinerary).permit(:name)
    end
end
