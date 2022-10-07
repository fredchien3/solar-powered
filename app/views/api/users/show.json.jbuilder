json.user do
  json.extract! @user, :id, :email, :username, :display_name, :created_at, :updated_at
end