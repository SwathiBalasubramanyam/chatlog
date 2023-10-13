class Workspace < ApplicationRecord

    validates :name, presence: true, uniqueness: true, length: {in: 3..255, if: :name?}

    belongs_to :owner,
        class_name: :User,
        primary_key: :id,
        foreign_key: :owner_id

    has_many :workspace_members,
        class_name: :WorkspaceMember,
        primary_key: :id,
        foreign_key: :workspace_id

    has_many :members,
        through: :workspace_members,
        source: :member
    
end
