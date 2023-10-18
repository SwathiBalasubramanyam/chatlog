json.user do
    json.extract! @user, :id, :email, :full_name, :display_name, :about_me, :name_pronunciation, :created_at, :updated_at
end