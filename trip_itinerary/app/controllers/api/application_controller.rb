class Api::ApplicationController < ApplicationController
    skip_before_action(:verify_authenticity_token)
    private

    def authenticate!
        render json: {status: 401}, status: 401 unless current_user.present?
    end
end
