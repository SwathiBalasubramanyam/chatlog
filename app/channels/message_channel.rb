class MessageChannel < ApplicationCable::Channel
    def subscribed
        # every time a client sends a request to subscribe, they send a channelId
        # each time they subscribe a new instance is created say client 1 is subscribed to channel 1 
        stream_for(Channel.find_by(id: params[:channel_id]))
        puts "successfuly subscribed to #{params[:channel_id]}"
    end
end