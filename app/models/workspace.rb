class Workspace < ApplicationRecord

    validates :name, presence: true, uniqueness: true, length: {in: 3..255, if: :name?}

    belongs_to :owner,
        class_name: :User,
        primary_key: :id,
        foreign_key: :owner_id
    
end
