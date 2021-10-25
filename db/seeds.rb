# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
20.times do |a|
  user = User.create(
    provider: "email", uid: Faker::Internet.unique.email,
    name: Faker::Name.unique.name, email: Faker::Internet.unique.email,
    mobile: Faker::PhoneNumber.cell_phone,
    image: Faker::Avatar.image, location: Faker::Address.full_address,
    about_me: Faker::Lorem.paragraph(sentence_count: 10),
    password: '123456789'
  )
  3.times do |a|
    user.articles.create(
      title: Faker::Movie.title,
      is_publish: Faker::Boolean.boolean,
      publish_date: Faker::Date.between(from: '2019-12-31', to: Date.today.to_s),
      content: Faker::Quote.matz,
      view_count: Faker::Number.between(from: 1, to: 1000),
      image: Faker::Avatar.image
    )
  end
end