class Message < ApplicationRecord

    validates :text, presence: true

    belongs_to :channel,
        class_name: :Channel,
        foreign_key: :channel_id,
        primary_key: :id

end
