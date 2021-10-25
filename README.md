# Fullstack development test

**DEMO** https://p

This README would normally document whatever steps are necessary to get the
application up and running. Things you may want to cover:

 Languages | Version
------------ | -------------
![image](https://raw.githubusercontent.com/Shahidrox/icone/main/Ruby.svg) | ruby `'3.0.1'`
![image](https://raw.githubusercontent.com/Shahidrox/icone/main/Ruby_on_Rails.svg) |  rails `'6.1.4.1'`
![image](https://raw.githubusercontent.com/Shahidrox/icone/main/PostgreSQL.svg) | (PostgreSQL) `'13.3'`
![image](https://raw.githubusercontent.com/Shahidrox/icone/main/Node.svg) | node (-> `'v14.17.1'`)
![image](https://raw.githubusercontent.com/Shahidrox/icone/main/Docker.svg) | Docker `'20.10.7'`
<img src ="https://raw.githubusercontent.com/Shahidrox/ImageIcone/main/mac.png" width="40"> | Big Sur `'11.4 (20F71)'`

## Getting Started
```bash
**Run locally**
git https://github.com/ekohe/recruitment-test-fullstack.git
cd recruitment-test-fullstack
rake db:setup
rails s
```
```bash
**Run test**
bundle exec rails db:create -e test
bundle exec rails db:migrate -e test
bundle exec rspec
File: recruitment-test-fullstack/spec/requests/api/v1/fullstack_api_spec.rb
File: recruitment-test-fullstack/spec/unit/unit_test_spec.rb
```
**Run with Docker**
 Docker | - setup
------------ | -------------
**Image rebuild:** | ```$ docker-compose build```
**Container launch:** | ```$ docker-compose up -d```
**DB create:** | ```$ docker-compose run web rails db:create```
**DB migrate:** | ```$ docker-compose run web rails db:migrate```
**DB seed:** | ```$ docker-compose run web rails db:seed```
**database.yml**| Uncomment ```host, username, password```

## API Document 
**Swagger Doc**|-
------------|--------------
http://localhost:3000/api-docs/v1/index.html | ![image](https://raw.githubusercontent.com/Shahidrox/ImageIcone/main/2.png)
## API
Type|method|API | Params
-|-|-|-
Signup |<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/post.png" width="50" height="20">|```/api/v1/user)```|```{"name": "string", "email": "string", "password": "string", "password_confirmation": "string" }```
Login|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/post.png" width="50" height="20">|```/api/v1/user/sign_in```|```{"email": ', password: ''}```
SignOut| <img src="https://raw.githubusercontent.com/Shahidrox/icone/main/delete.png" width="50" height="20">|```/api/v1/user/sign_out```|```headers: {'access-token': '','client': '','uid': '','token-type': 'Bearer'}```
Search articles|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/get.png" width="50" height="20">|```/api/v1/articles?page=${page_no}&title=${title}&publish_date=${publish_date}```|```-```
Create article|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/post.png" width="50" height="20">|```/api/v1/articles```|```:params => {title: '',is_publish: true,publish_date: '',content: ''}, headers: {'access-token': '', 'client': '', 'uid': '', 'expiry': '', 'token-type': 'Bearer'}```
Update article|<img src="https://raw.githubusercontent.com/Shahidrox/ImageIcone/main/put.png" width="50" height="20">|```/api/v1/articles/#{id}```|```headers: {'access-token': '', 'client': '', 'uid': '','expiry': '', 'token-type': 'Bearer'}, {title: '', is_publish: '', publish_date: '', content: '', image:''}```
Delete article|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/delete.png" width="50" height="20">|```/api/v1/articles/#{id}```|```headers: {'access-token': auth.accessToken,'client': auth.client,'uid': auth.uid}```
Artical details|<img src="https://raw.githubusercontent.com/Shahidrox/icone/main/get.png" width="50" height="20">|```/api/v1/articles/#{id}```|```-```
