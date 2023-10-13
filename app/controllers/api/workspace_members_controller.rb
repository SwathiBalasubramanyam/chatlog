class Api::WorkspaceMembersController < ApplicationController

  before_action :require_logged_in, only: [:create, :update, :index]

  wrap_parameters include: WorkspaceMember.attribute_names

  def create
    begin
      @workspace_member = WorkspaceMember.new(workspace_member_params)
    rescue ArgumentError => e
      puts e.message
      render json: {errors: ["#{workspace_member.status} is not a valid status"]}, status: :unprocessable_entity
    else
      @workspace_member[:member_id] = @current_user.id
      @workspace_member[:workspace_id] = params[:workspace_id]
      if @workspace_member.save
        render "api/workspace_members/create"
      else
        render json: {errors: @workspace_member.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end

  def update
    @workspace_member = WorkspaceMember.find_by(id: params[:id], member_id: @current_user.id, workspace_id: params[:workspace_id])
    if !@workspace_member
      render json: {errors: ["You don't have permissions to update this member"]}, status: :unauthorized
    end

    if @workspace_member.update(workspace_member_params)
      render "api/workspace_members/create"
    else
      render json: {errors: @workspace_member.errors.full_messages}
    end
  end

  def index
    @workspace_members = WorkspaceMember.where(workspace_id: params[:workspace_id])
    render "api/workspace_members/index"
  end

  private
  def workspace_member_params
    print "*********"
    print "this is what we are getting from params"
    print params

    print "thats the end of it "
    print "*********"
    params.require("workspace_member").permit(:workspace_id, :title, :status, :role)
  end
end
