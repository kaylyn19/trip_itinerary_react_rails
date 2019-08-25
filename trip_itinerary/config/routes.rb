Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :users, only: [:create] do
        get :current, on: :collection
        get :user_itinerary
      end      
      resource :session, only: [:create, :destroy]
      resources :itineraries, only: [:create, :show, :destroy, :update]
      resources :events, only: [:create, :show]
    end
  end
end
