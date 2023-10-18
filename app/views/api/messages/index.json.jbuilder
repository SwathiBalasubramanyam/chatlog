@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :text, :channel_id, :owner_id, :created_at, :updated_at
    end
end