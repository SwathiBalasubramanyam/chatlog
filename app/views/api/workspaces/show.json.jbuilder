json.workspace do
    json.extract! @workspace, :id, :name, :icon, :url, :created_at, :updated_at
end