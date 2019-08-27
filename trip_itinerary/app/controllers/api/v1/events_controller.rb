class Api::V1::EventsController < Api::ApplicationController
    def create
        results = Geocoder.search([params[:event][:latitude], params[:event][:longitude]])
        event = Event.find_or_create_by(
            name: params[:event][:name],
            description: params[:event][:description],
            longitude: params[:event][:longitude],
            latitude: params[:event][:latitude],
            address: results.first.address,
            labels: params[:event][:labels],
            start: params[:event][:start],
            end: params[:event][:end]
        )
        
        if event.save
            render json: {id: event.id, status: 200}, status: 200
        else
            render json: {errors: event.errors.full_messages}, status: 422
        end
    end

    def show
        event = Event.find params[:id]
        if event
            render json: event
        end
    end

    def destroy
        event = Event.find params[:id]
        event.destroy
        render json: {message: "successfully deleted", status: 200}
    end
end
