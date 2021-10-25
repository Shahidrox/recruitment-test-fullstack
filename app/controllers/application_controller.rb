class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery
  skip_before_action :verify_authenticity_token
  before_action :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_user, :user_signed_in?, :authenticate_user!

  protected
  
  def configure_permitted_parameters
    attributes = [:name, :email, :mobile, :image, :location, :about_me]
    devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
    devise_parameter_sanitizer.permit(:account_update, keys: attributes)
  end
end
