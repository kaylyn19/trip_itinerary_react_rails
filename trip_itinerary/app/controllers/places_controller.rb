class PlacesController < ApplicationController
    def new
        @place = Place.new
    end

    def create
        from = params[:from_date]
        to = params[:to_date]
        name = params.values[4..-4]
        redirect_to result_path(from: from, to: to, name: name)
    end

    def result
        @from = params[:from]
        @to = params[:to]
        @name = params[:name].join(', ')
    end
end

