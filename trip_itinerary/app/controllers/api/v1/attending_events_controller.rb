class Api::V1::AttendingEventsController < Api::ApplicationController
    def create
        key_params = params[:attending_event]
        day = Day.where(from_date: key_params[:day_id][0], itinerary_id: key_params[:day_id][1])
        event = AttendingEvent.new(
            event_id: key_params[:event_id],
            day_id: day[0].id,
        )
        byebug

        if event.save
            render json: {id: event.id}, status: 200
        else
            render json: {errors: event.errors.full_messages}, status: 422
        end
    end
end
