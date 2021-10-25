class FormatTime
  class << self
    include ActionView::Helpers::DateHelper

    def time_in_word(date)
      time_ago_in_words(date) + ' ago' if date.present?
    end
  end
end