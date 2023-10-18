json.workspace do
    json.extract! @workspace, :id, :owner_id, :name, :icon, :url, :created_at, :updated_at, :member_ids
end

workspace_members = @workspace.workspace_members.includes(:member)

json.workspace_members do
    workspace_members.each do |workspace_member|
        json.set! workspace_member.member_id do
            json.extract! workspace_member, :id, :member_id, :workspace_id, :title, :status, :role, :created_at, :updated_at
            json.email workspace_member.member.email
            json.full_name workspace_member.member.full_name
            json.display_name workspace_member.member.display_name
            json.about_me workspace_member.member.about_me
            json.name_pronunciation workspace_member.member.name_pronunciation
        end
    end
end

channels = @workspace.channels.includes(:members)
json.channels do 
    channels.each do |channel|
        if channel.member_ids.include?(@current_user.id)
            json.set! channel.id do
                json.extract! channel, :id, :owner_id, :workspace_id, :name, :description, 
                    :is_channel, :created_at, :updated_at, :is_default
                json.member_ids channel.members.map{|mem| mem.id}
            end
        end
    end
end