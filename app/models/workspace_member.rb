class WorkspaceMember < ApplicationRecord

    enum :status, { "Active": 0, "Away": 1, 
                    "In a meeting": 2, "Commuting": 3, "Sick": 4, 
                    "Vacationing": 5, "Working remotely": 6}

    validates :title, length: {in: 2..255, if: :title?}
    validates :role , length: {in: 2..255, if: :role?}

    belongs_to :member,
        class_name: :User,
        primary_key: :id,
        foreign_key: :member_id
    
    belongs_to :workspace,
        class_name: :Workspace,
        primary_key: :id,
        foreign_key: :workspace_id

end
