@workspaces.each do |workspace|
    json.set! workspace.id do
        json.extract! workspace, :id, :name
        json.member workspace.owner_id == @current_user.id
    end
end