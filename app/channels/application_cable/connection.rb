module ApplicationCable
  class Connection < ActionCable::Connection::Base

    def connect 
      puts "connecting..."
      puts "user who requested" 
      puts cookies.encrypted["_session"]
    end

  end
end
