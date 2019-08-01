class Api::V1::SessionsController < Api::ApplicationController
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {id: user.id}, status: 200
        else
            render json: {error: user.errors}, status: 422
        end
    end

    def destroy
        session[:user_id] = nil
        render json: {status: 200}, status: 200
    end
end
