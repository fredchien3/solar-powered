json.user do
  json.extract! @user, :id, :email, :username, :display_name
end