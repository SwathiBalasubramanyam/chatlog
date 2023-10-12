class WorkspaceMember < ApplicationRecord

    enum :status, { "Active": 0, "Away": 1, 
                    "In a meeting": 2, "Commuting": 3, "Sick": 4, 
                    "Vacationing": 5, "Working remotely": 6}
end
