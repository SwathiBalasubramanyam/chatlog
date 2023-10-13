@workspace_members.each do |workspace_member|
    json.set! workspace_member.id do
        json.extract! workspace_member, :id, :member_id, :workspace_id, :title, :status, :role, :created_at, :updated_at
    end
end