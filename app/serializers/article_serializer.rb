class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :user_nm, :profile_pc, :title, :is_publish, :publish_date, :content, :view_count, :image, :publish_dt

  def profile_pc
    if object.try(:user).try(:image).present?
      object.try(:user).try(:image) 
    else
      "/assets/users/def.png"
    end
  end

  def user_nm
    object.try(:user).try(:name)
  end

  def publish_date
    FormatTime.time_in_word(object&.publish_date)
  end

  def publish_dt
    object&.publish_date&.strftime("%Y-%m-%d")
  end

  def image
    if object.image.present?
      object.image
    else
      "/assets/users/def.png"
    end
  end

end