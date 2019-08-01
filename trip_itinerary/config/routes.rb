Rails.application.routes.draw do
  get '/', {to: "home#new", as: 'root'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :places, only: [:new, :create]
  # resources :itineraries, only: [:show]

  # resources :users, only: [:new, :create]
  # resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]
    end
  end
end
