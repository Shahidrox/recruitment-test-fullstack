Rails.application.routes.draw do 

  mount Rswag::Ui::Engine => '/api-docs/v1'
  mount Rswag::Api::Engine => '/api-docs/v1'

  mount_devise_token_auth_for 'User', at: 'api/v1/user', defaults: { format: "json" }

  namespace 'api' do
    namespace 'v1' do
      resources :articles, only: [:index, :create, :update, :destroy, :show]
      resources :users, only: [:index] do
        collection do
          patch :update_user
          get  :get_article
        end
      end
    end
  end
  get 'auth/sign_in'     => 'homes#details'
  get 'auth/sign_up'     => 'homes#details'
  get 'users/details'    => 'homes#details'
  get 'users/list'       => 'homes#details'
  get 'articles/:id'     => 'homes#details'
  get '/user/article'    => 'homes#details'
  get '/user/newarticle' => 'homes#details'
  get '/user/article/edit/:id'=> 'homes#details'
  root 'homes#details'
end
