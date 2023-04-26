Rails.application.routes.draw do
  resources :subscribers
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root 'home#index'
end
