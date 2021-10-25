class ArticleService
  attr_reader :options

  def initialize(options = {})
    params        = options[:params]
    @title        = params.present? ? params[:title] : ''
    @publish_date = params.present? ? params[:publish_date] : ''
    @is_publish   = params.present? ? params[:is_publish].present? ? true?(params[:is_publish]) : true : true
    @user         = params.present? ? params[:user] : ''
  end

  def search
    article = Article.includes(:user).references(:user).where('articles.is_publish = ? AND publish_date <= ?', @is_publish, DateTime.now)
    article = article.where('articles.title LIKE ? OR articles.content LIKE ?', "%#{@title}%", "%#{@title}%") if @title.present?
    article = article.where('date(articles.publish_date) = ?', @publish_date.to_date) if @publish_date.present?
    article = article.where('users.id = ? OR users.name = ?', @user, @user) if @user.present?
    article = article.order('date(articles.publish_date) DESC') if article.present?
    return article
  end

  def true?(obj)
    obj.to_s.downcase == "true"
  end
end