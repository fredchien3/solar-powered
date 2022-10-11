# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  User.create!(
    username: 'ford', 
    display_name: 'ford',
    email: 'fred.chien3@gmail.com', 
    password: 'password'
  )

  User.create!(
    username: 'gaben', 
    display_name: 'gaben',
    email: 'gaben@valvesoftware.com', 
    password: 'MoolyFTW'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Done!"
end