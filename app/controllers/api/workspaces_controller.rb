class Api::WorkspacesController < ApplicationController

  before_action :require_logged_in, only: [:create, :index, :update, :show]
  wrap_parameters include: Workspace.attribute_names

  def show
    @workspace = Workspace.find(params[:id])
    render "api/workspaces/show"
  end

  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id = @current_user.id
    if @workspace.save
      WorkspaceMember.create!(member_id: @current_user.id, workspace_id: @workspace.id, role: "admin")
      Channel.create!(owner_id: @current_user.id, workspace_id: @workspace.id, 
        name: :general, description: "This channel is for team-wide communication and announcements. All team members are in this channel.")

      Channel.create!(owner_id: @current_user.id, workspace_id: @workspace.id, 
      name: :random, description: "This channel is for... well, everything else. It's a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!")

      render "api/workspaces/create"
    else
      render json: {errors: @workspace.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @workspaces = Workspace.all
    render "api/workspaces/index"
  end

  def update
    @workspace = Workspace.find(params[:id], owner_id: @current_user.id)
    if !@workspace
      render json: {errors: ["Only admins can edit a workspace"]}, status: 404
    end

    if @workspace.update(workspace_params)  
      render "api/workspaces/create"
    else
      render json: {errors: @workspace.errors.full_messages}, status: :unprocessable_entity
    end  
  end

  private
  def workspace_params
    params.require("workspace").permit(:name, :url, :icon)
  end
end
