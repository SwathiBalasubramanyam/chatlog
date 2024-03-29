class ApplicationController < ActionController::API

    before_action :snake_case_params, :attach_authenticity_token

    include ActionController::RequestForgeryProtection
    
    protect_from_forgery with: :exception

    rescue_from StandardError, with: :unhandled_error

    rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_authenticity_token

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        unless current_user
            render status: :unauthorized, json: { error: "You are not authorized to access this resource."}
        end
    end

    def require_logged_out
        if current_user
            render status: :unauthorized, json: { error: "You are not authorized to access this resource."}
        end
    end

    def login!(user)
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        @current_user.reset_session_token!
        @current_user = nil
        session[:session_token] = nil
    end

    def require_workspace_member
        if !@current_user.workspace_ids.include?(params[:workspace_id].to_i)
            render json: {errors: ["You dont have permission on this workspace"]}, status: 401
        end
    end

    def require_channel_member
        @channel = Channel.find(params[:channel_id])
        if !@channel.member_ids.include?(@current_user.id) 
            render json: {errors: ["You dont have permission on this channel"]}, status: 401
        end
    end

    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, status: :unprocessable_entity
    end

    def unhandled_error(error)
        if request.accepts.first.html?
            raise error
        else
            @message = "#{error.class} - #{error.message}"
            @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
            render 'api/errors/internal_server_error', status: :internal_server_error
            logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end

end
