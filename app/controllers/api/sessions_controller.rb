class Api::SessionsController < ApplicationController

  before_action :require_logged_in, only: [:show, :destroy]
  before_action :require_logged_out, only: [:create]

  def show
    @user = @current_user
    render "api/users/show"
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: ['Invalid credentials.']}, status: :unauthorized
    end

  end

  def destroy
    logout!
    render json: {message: "Logged out successfully!!"}
  end

end
