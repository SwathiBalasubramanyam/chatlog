class Channel < ApplicationRecord

    validates :name, presence: true, 
        uniqueness: {scope: :workspace_id, message: "Name must be unique for a workspace"}

    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id,
        primary_key: :id

    belongs_to :workspace,
        class_name: :Workspace,
        foreign_key: :workspace_id,
        primary_key: :id

    has_many :channel_members,
        class_name: :ChannelMember,
        primary_key: :id,
        foreign_key: :channel_id,
        dependent: :destroy

    has_many :members,
        through: :channel_members,
        source: :user

    has_many :messages,
        class_name: :Message,
        primary_key: :id,
        foreign_key: :channel_id,
        dependent: :destroy

end
