class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :about_me, :mobile, :location, :image, :created_at, :updated_at

  def image
    if object.image.present?
      object.image
    else
      "/assets/users/def.png"
    end
  end

end