class ChannelMember < ApplicationRecord

    belongs_to :channel,
        class_name: :Channel,
        foreign_key: :channel_id,
        primary_key: :id

    belongs_to :user,
        class_name: :User,
        foreign_key: :member_id,
        primary_key: :id

end