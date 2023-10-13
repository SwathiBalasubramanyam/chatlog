@workspaces.each do |workspace|
    json.set! workspace.id do
        json.extract! workspace, :id, :name, :icon, :url, :created_at, :updated_at, :member_ids
        json.admin workspace.owner_id == @current_user.id
    end
end