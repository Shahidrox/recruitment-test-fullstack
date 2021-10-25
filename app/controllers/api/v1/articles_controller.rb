class Api::V1::ArticlesController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
	before_action :set_page, only: [:index]
  before_action :set_article, only: [:show, :destroy]

	include Pagination
  DEFAULT_PAGE = 1
  DEFAULT_PAGE_SIZE = 10

  def index
    begin
      @articles   = ArticleService.new({params: params}).search.page(@page).per(@size)
      if @articles.present?
	      pages     = pagination(@articles)
        @articles = ActiveModelSerializers::SerializableResource.new(@articles, each_serializer: ArticleSerializer).as_json
	      render json: { success: true, articles: @articles, pagination: pages }, status: :ok
    	else
    		render json: { success: false, errors: ['You don\'t have the articles'] }, status: :ok
    	end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  def show
    begin
      if @article.present?
        @article.update(view_count: ((@article.view_count || 0) + 1)) unless (params[:screen] == 'edit') || (@article.user == current_user)
        artcle = ActiveModelSerializers::SerializableResource.new(@article, each_serializer: ArticleSerializer).as_json
        render json: { success: true, articles: artcle}, status: :ok
      else
        render json: { success: false, errors: ['You don\'t have the article'] }, status: :ok
      end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  def create
    begin
      article = current_user.articles.build(article_params)
      if article.valid?
        if article.save
          render json: { success: true, articles: article.as_json}, status: :ok
        else
          render json: { success: false, errors: ['Can\'t create the articles'] }, status: :ok
        end
      else
        render json: { success: false, errors: article.errors }, status: :unprocessable_entity
      end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  def update
    begin
      article = current_user.articles.find_by(id: params[:id])
      if article.present?
        if article.update(article_params)
          render json: { success: true, articles: article.as_json}, status: :ok
        else
          render json: { success: false, errors: article.errors }, status: :unprocessable_entity
        end
      else
        render json: { success: false, errors: ['You don\'t have the article'] }, status: :ok
      end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  def destroy
    begin
      if @article.present?
        if @article.destroy
          render json: { success: true}, status: :ok
        else
          render json: { success: false, errors: @article.errors }, status: :unprocessable_entity
        end
      else
        render json: { success: false, errors: ['You don\'t have the article'] }, status: :ok
      end
    rescue => e
      render json: { success: false, errors: e }, status: :internal_server_error
    end
  end

  private
    def true?(obj)
      obj.to_s.downcase == "true"
    end

    def set_page
      @page = params[:page].present? ? params[:page].to_i : DEFAULT_PAGE
      @size = params[:size].present? ? params[:size].to_i : DEFAULT_PAGE_SIZE
    end

    def set_article
      @article = Article.find_by(id: params[:id])
    end

    def article_params
      params.permit(:title, :content, :publish_date, :is_publish, :image, :view_count)
    end

end
