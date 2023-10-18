json.message do
    json.extract! @message, :id, :text, :channel_id, :owner_id, :created_at, :updated_at
end