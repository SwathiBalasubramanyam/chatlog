# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Workspace.destroy_all
    WorkspaceMember.destroy_all
    Channel.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_members')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user1 = User.create!(
      email: 'demo1@chatlog.com', 
      password: 'chatlog'
    )

    user2 = User.create!(
      email: 'demo2@chatlog.com', 
      password: 'chatlog'
    )
  
    # More users
    5.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    user3 = User.find(3)
    user4 = User.find(4)
    user5 = User.find(5)

    puts "Creating workspaces"
    workspace1= Workspace.create!({
      owner_id: user1.id,
      name: "AAO-July-2023",
      url: "aao-july-2023/chatlog.com",
      icon: "AA"
    })

    Channel.create!(owner_id: user1.id, workspace_id: workspace1.id, 
    name: :general, 
    description: "This channel is for team-wide communication and announcements. All team members are in this channel.")

    Channel.create!(owner_id: user1.id, workspace_id: workspace1.id, 
    name: :random, 
    description: "This channel is for... well, everything else. It's a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!")

    workspace2 = Workspace.create!({
      owner_id: user2.id,
      name: "AAO-hogwarts-club",
      url: "aao-hogwarts-club/chatlog.com",
      icon: "AH"
    })

    Channel.create!(owner_id: user2.id, workspace_id: workspace2.id, 
    name: :general, 
    description: "This channel is for team-wide communication and announcements. All team members are in this channel.")

    Channel.create!(owner_id: user2.id, workspace_id: workspace2.id, 
    name: :random, 
    description: "This channel is for... well, everything else. It's a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!")

    puts "Creating workspace_members"
    WorkspaceMember.create!({
      member_id: user1.id,
      workspace_id: workspace1.id,
      title: "Lead Instructor"
    })
    WorkspaceMember.create!({
      member_id: user3.id,
      workspace_id: workspace1.id,
      title: "Student"
    })
    
    WorkspaceMember.create!({
      member_id: user4.id,
      workspace_id: workspace1.id,
      title: "Student"
    })

    WorkspaceMember.create!({
      member_id: user2.id,
      workspace_id: workspace2.id,
    })

    WorkspaceMember.create!({
      member_id: user4.id,
      workspace_id: workspace2.id 
    })

    WorkspaceMember.create!({
      member_id: user5.id,
      workspace_id: workspace2.id
    })
  
    puts "Done!"
  end