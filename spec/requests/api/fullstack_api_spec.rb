require 'rails_helper'

RSpec.describe Api::V1::UsersController do

  describe "User Login, Signup, SignOut, Create artical, Delete artical" do
    before do
      user = User.create(name: Faker::Name.unique.name, email: 'test@gmail.com', password: "HR88467617508")
    end

    it "User login check" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      expect(response.status).to eq(200)
    end

    it "User sign_out check" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      delete '/api/v1/user/sign_out',
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'token-type': 'Bearer'
        }
      expect(response.status).to eq(200)
    end

    it "Signup user" do
      post '/api/v1/user',
        :params => {
          name: 'DemoTest',
          email: 'demo2@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      expect(response.status).to eq(200)
    end

    it "Create Artical by valid object" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      post '/api/v1/articles',
        :params => {
          title: 'artical 1',
          is_publish: true,
          publish_date: Date.today,
          content: Faker::Quote.matz
        },
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'expiry': response.headers['expiry'],
          'token-type': 'Bearer'
        }
      expect(response.status).to eq(200)
    end

    it "Create Artical by invalid object" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      post '/api/v1/articles',
        :params => {},
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'expiry': response.headers['expiry'],
          'token-type': 'Bearer'
        }
      expect(response.status).to eq(422)
    end

    it "Artical Title can't be blank" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      post '/api/v1/articles',
        :params => {
          is_publish: true,
          publish_date: Date.today,
          content: Faker::Quote.matz
        },
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'expiry': response.headers['expiry'],
          'token-type': 'Bearer'
        }
      expect(response.status).to eq(422)
    end

    it "Delete artical by ID" do
      post '/api/v1/user/sign_in',
        :params => {
          email: 'test@gmail.com',
          password: 'HR88467617508'
        }
      post '/api/v1/articles',
        :params => {
          title: 'artical 1',
          is_publish: true,
          publish_date: Date.today,
          content: Faker::Quote.matz
        },
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'expiry': response.headers['expiry'],
          'token-type': 'Bearer'
        }
      id = JSON.parse(response.body)["articles"]["id"]
      delete "/api/v1/articles/#{id}",
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.headers['uid'],
          'expiry': response.headers['expiry'],
          'token-type': 'Bearer'
        }
      expect(response.status).to eq(200)
    end

  end

  describe "Search list of artical" do

    before do
      user = User.create(name: Faker::Name.unique.name, email: 'test@gmail.com', password: "HR88467617508")
      cnt = 0
      10.times do
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

    it "Get all artical by title" do
      article_title = Article.first.title
      get "/api/v1/articles?title=#{article_title}"
      title = JSON.parse(response.body)["articles"][0]["title"]
      expect(title).to include(article_title)
    end

    it "Get all artical by Content" do
      article_content = Article.first.content
      get "/api/v1/articles?title=#{article_content}"
      content = JSON.parse(response.body)["articles"][0]["content"]
      expect(content).to include(article_content)
    end

    it "Get all artical by Publish date" do
      publish_date = Article.first.publish_date
      get "/api/v1/articles?publish_date=#{publish_date}"
      expect(response.status).to eq(200)
    end

    it "Get artical by ID" do
      id = Article.first.id
      get "/api/v1/articles/#{id}"
      res = JSON.parse(response.body)
      expect(res["articles"]["id"]).to eq(id)
    end

  end

end