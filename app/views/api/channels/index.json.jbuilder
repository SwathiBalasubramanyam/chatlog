@channels.each do |channel|
    json.set! channel.id do
        json.extract! channel, :id, :owner_id, :workspace_id, :name, :description, :is_channel, :created_at, :updated_at
    end
end