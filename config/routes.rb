Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: :create
    resources :games, only: [:index, :show]
  end

  get '*path', to: "static_pages#frontend_index"
end
