class Api::ChannelMembersController < ApplicationController

    before_action :require_logged_in, only: [:create]
    wrap_parameters ['member_ids']


    def create
        @channel = Channel.find_by(id: params[:channel_id])
        @workspace = Workspace.find_by(id: @channel.workspace_id)
        if !@current_user.workspace_ids.include?(@channel.workspace_id)
            render json: {errors: ["You dont have permission on this workspace"]}, status: 401
        end
        params[:member_ids].each {|mem_id|
            ChannelMember.create!(member_id: mem_id, channel_id: @channel.id, active: true)
        }
        render "api/workspaces/show"
    end
end
