class Api::ChannelMembersController < ApplicationController

    before_action :require_logged_in, only: [:create, :update]

    def create
        channel_id = params[:channel_id]
        cm_params = channel_member_params
        if cm_params[:member_id]
            @channel_member = ChannelMember.create!(member_id: cm_params[:member_id], channel_id: channel_id)  
        elsif cm_params[:member_ids]
            cm_params[:member_ids].each {|mem_id|
                ChannelMember.create!(member_id: mem_id, channel_id: channel_id)
            }
        else
            render json: {errors: ["memberId or memberIds should be provided"]}, status: :unprocessable_entity
        end
        @channel_members = channelMember.where(channel_id: channel_id, active: true)
        render "api/channel_members/index"
    end

    def update
        @channelMember = ChannelMember.find_by(id: params[:id], channel_id: params[:channel_id])
        if !@channel_member
            render json: {errors: ["Couldnt find the resource"]}, status: 404
        end

        if @channel_member.update(channel_member_params)
            render "api/channel_members/show"
        end
    end

    private
    def channel_member_params
        params.require(:channel_member).permit(:member_id, :member_ids, :active)
    end
end
