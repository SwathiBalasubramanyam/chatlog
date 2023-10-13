class Channel < ApplicationRecord

    validates :name, presence: true, 
        uniqueness: {scope: :workspace_id, message: "Name must be unique for a workspace"}

end
