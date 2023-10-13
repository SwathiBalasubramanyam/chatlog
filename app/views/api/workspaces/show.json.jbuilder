json.workspace do
    json.extract! @workspace, :id, :name, :icon, :url, :created_at, :updated_at, :members
    json.admin @workspace.owner_id == @current_user.id
end