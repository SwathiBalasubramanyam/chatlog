class Api::MessagesController < ApplicationController

  before_action :require_logged_in, :require_channel_member, only: [:create, :index]

  def create
    @message = Message.new(message_params)
    @channel = Channel.find_by(id: params[:channel_id])
    @message["channel_id"] = @channel.id
    @message["owner_id"] = @current_user.id
    @message.save
    MessageChannel.broadcast_to(@channel, {
      id: @message.id,
      text: @message.text,
      ownerId: @message.owner_id,
      channelId: @message.channel_id,
      createdAt: @message.created_at,
      updatedAt: @message.updated_at
    })
    render "api/messages/show"
  end

  def index
    @messages = Message.where(channel_id: params[:channel_id])
    render "api/messages/index"
  end

  private
  def message_params
    params.require(:message).permit(:text, :owner_id, :channel_id)
  end
end
