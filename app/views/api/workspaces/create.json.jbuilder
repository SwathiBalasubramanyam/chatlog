json.workspace do
    json.extract! @workspace, :id, :owner_id, :name, :icon, :url, :created_at, :updated_at, :member_ids
end