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
      render "api/workspaces/show"
    else
      render json: {errors: @workspace.errors.full_messages}, status: 422
    end
  end

  def index
    @workspaces = Workspace.all
    render "api/workspaces/index"
  end

  def update
    @workspace = Workspace.find(params[:id])
    if @workspace.update(workspace_params)  
      render "api/workspaces/show"
    else
      render json: {errors: @workspace.errors.full_messages}, status: 422

    end  
  end

  def workspace_params
    params.require("workspace").permit(:name, :url, :icon)
  end
end
