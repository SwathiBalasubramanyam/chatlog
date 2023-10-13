class Api::ChannelsController < ApplicationController
  def create
  end

  def update
  end

  def index
    @channels = Channel.where(workspace_id: params[:workspace_id])
    render "api/channels/index"
  end
end
