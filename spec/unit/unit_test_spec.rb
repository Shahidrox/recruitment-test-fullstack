require 'rails_helper'

RSpec.describe 'Article', type: :model do

  describe "Artical" do
    before do
      user = User.create(name: Faker::Name.unique.name, email: Faker::Internet.unique.email, password: "HR88467617508")
      5.times do
        user.articles.create(
          title: Faker::Movie.title,
          is_publish: true,
          publish_date: Faker::Date.between(from: '2019-12-31', to: Date.today.to_s),
          content: Faker::Quote.matz,
          view_count: Faker::Number.between(from: 1, to: 1000),
          image: Faker::Avatar.image
        )
      end
    end

    it "Create with valid object" do
      user = User.first
      article = Article.new(user_id: user.id, title: Faker::Movie.title, is_publish: Faker::Boolean.boolean, publish_date: Date.today, content: Faker::Quote.matz, image: Faker::Avatar.image)
      expect(article.valid?).to eq(true)
    end

    it "Artical with invalid object" do
      article = Article.new(title: Faker::Movie.title, is_publish: Faker::Boolean.boolean, publish_date: Date.today, content: Faker::Quote.matz, image: Faker::Avatar.image)
      expect(article.valid?).to eq(false)
    end

    it "Artical create without title" do
      user = User.first
      article = Article.new(user_id: user.id, title: '', is_publish: Faker::Boolean.boolean, publish_date: Date.today, content: Faker::Quote.matz, image: Faker::Avatar.image)
      expect(article.valid?).to eq(false)
    end


    it "Artical list display" do
      article = ArticleService.new.search
      expect(article.length).to eq(5)
    end

    it "Artical search by title" do
      user = User.first
      user.articles.create(
        title: 'This is test',
        is_publish: true,
        publish_date: Faker::Date.between(from: '2019-12-31', to: Date.today.to_s),
        content: Faker::Quote.matz,
        view_count: Faker::Number.between(from: 1, to: 1000),
        image: Faker::Avatar.image
      )
      article = ArticleService.new({params: {title: 'This is test'}}).search
      expect(article.length).to eq(1)
    end

  end
end