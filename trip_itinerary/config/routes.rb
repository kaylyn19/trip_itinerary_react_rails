Rails.application.routes.draw do
  get '/', {to: "home#new", as: 'root'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places, only: [:new, :create] do
    resources :itineraries do
      resources :destinations, only: [:create]
    end
  end
  resources :itineraries, only: [:create]
  get '/places/result', {to: 'places#result', as: 'result'}
  post '/places/generate', to: 'places#generate'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  # resources :destinations, only: [:create]
end
