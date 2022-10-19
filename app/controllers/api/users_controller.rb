class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  
  def create
    @user = User.new(user_params)
    if @user.save
      login! @user
      render :show  # show returns non-normalized, direct user data
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if params[:user_id]
      @user = User.find(params[:user_id])
    else
      @user = User.find_by(username: params[:username])
    end
    render :show # show returns non-normalized, direct user data
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
