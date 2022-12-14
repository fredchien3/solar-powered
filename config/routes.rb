Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :show]
    resources :games, only: [:index, :show] do
      resources :reviews, only: [:index, :create]
    end
    resources :cart_items, only: [:create, :index, :destroy]
    resources :library_items, only: [:create, :index]
    resources :wishlist_items, only: [:create, :index, :destroy]
    resources :reviews, only: [:update, :destroy] do
      resources :review_votes, only: [:create]
    end
    resources :review_votes, only: [:update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
