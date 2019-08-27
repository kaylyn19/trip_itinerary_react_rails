class Api::V1::AttendingEventsController < Api::ApplicationController
    def create
        key_params = params[:attending_event]
        day = Day.where(from_date: key_params[:day_id][0], itinerary_id: key_params[:day_id][1])
        event = AttendingEvent.new(
            event_id: key_params[:event_id],
            day_id: day[0].id,
        )

        if event.save
            render json: {id: event.id}, status: 200
        else
            render json: {errors: event.errors.full_messages}, status: 422
        end
    end

    # def destroy
    #     event = AttendingEvent.find_by(event_id: params[:event_id])
    #     event.destroy
    #     render json: {message: "Successfully deleted", status: 200}
    end
end
