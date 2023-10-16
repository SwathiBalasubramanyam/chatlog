class Api::ChannelsController < ApplicationController

  before_action :require_logged_in, :require_workspace_member, only: [:create, :update, :index]

  def show
    @channel = Channel.where(id: params[:id], workspace_id: params[:workspace_id])
    render "api/channels/show"
  end

  def create
    @channel = Channel.new(channel_params)
    @channel[:workspace_id] = params[:workspace_id]
    @channel[:owner_id] = @current_user.id
    if @channel.save
      render "api/channels/show"
    else
      render json: {errors: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @channel = Channel.where(id: params[:id], workspace_id: params[:workspace_id], owner_id: @current_user.id)
    if !@channel
      render json: {errors: ["Only admins can edit a channel"]}, status: 401
    end

    if @channel.update(channel_params)
      render "api/channels/show"
    else
      render json: {errors: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @channels = Channel.where(workspace_id: params[:workspace_id])
    render "api/channels/index"
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :description, :is_channel)
  end
end