Rails.application.routes.draw do
  get '/', {to: "home#new", as: 'root'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places#, only: [:new]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
