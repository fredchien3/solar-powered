# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  display_name    :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  validates_presence_of :display_name, :session_token
  validates_uniqueness_of :username, :email, :display_name, :session_token
  validates :username,
  length: { in: 3..30 },
  format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email,
  length: { in: 3..255 },
  format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
  length: { in: 6..255 },
  allow_nil: true
  before_validation :ensure_session_token, :set_display_name
  
  def self.find_by_credentials(credential, password)
    if URI::MailTo::EMAIL_REGEXP.match(credential)  # credential is email
      user = User.find_by(email: credential)
    else                                            # credential is username
      user = User.find_by(username: credential)
    end
    return true if user && user.authenticate(password)
    false
  end

  def reset_session_token!
    self.update!(session_token: self.generate_unique_session_token)
    return self.session_token
  end
  
  private
  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token if !User.exists?(session_token: token)
    end
  end
  
  def ensure_session_token
    self.session_token ||= self.generate_unique_session_token
  end
  
  def set_display_name
    self.display_name ||= self.username
  end
end