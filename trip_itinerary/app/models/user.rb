class User < ApplicationRecord
    has_secure_password
    has_many :itineraries, dependent: :destroy
    
    validates :first_name, presence: true
    validates :last_name, presence: true
    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i 
    validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_REGEX

    def full_name
        "#{first_name} #{last_name}".strip
    end
end
