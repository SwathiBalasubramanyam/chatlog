json.channel do
    json.extract! @channel, :id, :owner_id, :workspace_id, :name, :description, :is_channel, :created_at, :updated_at, :member_ids
end

channel_members = @channel.channel_members
json.channel_members do
    channel_members.each do |channel_mem|
        json.set! channel_mem.member_id do
            json.extract! channel_mem, :id, :member_id, :channel_id, :active, :created_at, :updated_at
        end
    end
end