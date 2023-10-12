class User < ApplicationRecord

    before_validation :ensure_session_token

    has_secure_password

    validates :email, presence: true, uniqueness: true, length: {in: 3..255, if: :email?}, format: { with: URI::MailTo::EMAIL_REGEXP , if: :email? }
    validates :full_name, length: {in: 3..255}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }, allow_blank: true
    validates :display_name, length: {in: 3..255}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }, allow_blank: true
    validates :password, length: {in: 6..255}, allow_nil: true
    validates :session_token, presence: true, uniqueness: true

    has_many :workspaces,
        class_name: :Workspace,
        primary_key: :id,
        foreign_key: :owner_id


    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.authenticate(password) ? user : nil
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    private

    def generate_unique_session_token
        while true
            session_token = SecureRandom.urlsafe_base64
            return session_token unless User.exists?(session_token: session_token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end


end
