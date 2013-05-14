Noar::Application.routes.draw do
  get "home/index"

  root :to => 'home#index'

  match 'resume' => 'resume#index'
end