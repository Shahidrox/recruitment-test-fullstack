class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    users = User.all
    if users.present?
      list = ActiveModelSerializers::SerializableResource.new(users, each_serializer: UserSerializer).as_json
      render json: { success: true, users: list}, status: :ok
    else
      render json: { success: false, errors: ['You don\'t have the users'] }, status: :ok
    end
  end

  def update_user
    begin
      if current_user.update(user_params)
        render json: { success: true, users: current_user.as_json}, status: :ok
      else
        render json: { success: false, errors: ['unprocessable entity'] }, status: :unprocessable_entity
      end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  def get_article
    articles = current_user.articles
    if articles.present?
      articles = ActiveModelSerializers::SerializableResource.new(articles.order('publish_date DESC'), each_serializer: ArticleSerializer).as_json
      render json: { success: true, articles: articles}, status: :ok
    else
      render json: { success: false, errors: ['You don\'t have the articles'] }, status: :ok
    end
  end

  private

  def user_params
    params.permit(:name, :mobile, :image, :location, :about_me)
  end

end
