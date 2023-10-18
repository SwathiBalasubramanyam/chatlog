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
    ChannelMember.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_members')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('channel_members')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user1 = User.create!(email: 'demo1@chatlog.com', password: 'chatlog')

    user2 = User.create!(email: 'demo2@chatlog.com', password: 'chatlog')
  
    # More users
    5.times do 
      User.create!({ email: Faker::Internet.unique.email, password: 'password'}) 
    end

    user3 = User.find(3)
    user4 = User.find(4)
    user5 = User.find(5)

    puts "Creating workspace 1"
    workspace1= Workspace.create!({
      owner_id: user1.id,
      name: "AAO-July-2023",
      url: "aao-july-2023/chatlog.com",
      icon: "AA"
    })

    puts "Creating workspace_members for workspace1"
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

    puts "creating channels for workspace 1"

    w1channel1 = Channel.create!(owner_id: user1.id, workspace_id: workspace1.id, 
    name: :general, is_default: true,
    description: "This channel is for team-wide communication and announcements. All team members are in this channel.")

    w1channel2 = Channel.create!(owner_id: user1.id, workspace_id: workspace1.id, 
    name: :random, is_default: true,
    description: "This channel is for... well, everything else. It's a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!")


    puts "creating channel_members for workspace1 channels"

    ChannelMember.create!(member_id: user1.id, channel_id: w1channel1.id, active: true)
    ChannelMember.create!(member_id: user3.id, channel_id: w1channel1.id, active: true)
    ChannelMember.create!(member_id: user4.id, channel_id: w1channel1.id, active: true)


    ChannelMember.create!(member_id: user1.id, channel_id: w1channel2.id, active: true)
    ChannelMember.create!(member_id: user3.id, channel_id: w1channel2.id, active: true)
    ChannelMember.create!(member_id: user4.id, channel_id: w1channel2.id, active: true)


    puts "creating private channels for members"
    u1w1dc = Channel.create!(owner_id: user1.id, workspace_id: workspace1.id, name: user1.id.to_s, is_channel: false, description: "This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)

    ChannelMember.create!(member_id: user1.id, channel_id: u1w1dc.id, active: true)

    u3w1dc = Channel.create!(owner_id: user3.id, workspace_id: workspace1.id, name: user3.id.to_s, is_channel: false, description: "This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)

    ChannelMember.create!(member_id: user3.id, channel_id: u3w1dc.id, active: true)

    u4w1dc = Channel.create!(owner_id: user4.id, workspace_id: workspace1.id, 
    name: user4.id.to_s, is_channel: false, description: "This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)
    ChannelMember.create!(member_id: user4.id, channel_id: u4w1dc.id, active: true)


    puts "Creating workspace 2"
    workspace2 = Workspace.create!({
      owner_id: user2.id,
      name: "AAO-hogwarts-club",
      url: "aao-hogwarts-club/chatlog.com",
      icon: "AH"
    })

    puts "Creating workspace_members for workspace 2"
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

    puts "creating channels for workspace 2"
    w2channel1 = Channel.create!(owner_id: user2.id, workspace_id: workspace2.id, 
    name: :general, is_default: true,
    description: "This channel is for team-wide communication and announcements. All team members are in this channel.")

    w2channel2 = Channel.create!(owner_id: user2.id, workspace_id: workspace2.id, 
    name: :random, is_default: true,
    description: "This channel is for... well, everything else. It's a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!")

    puts "creating channel_members for workspace2 channels"
    ChannelMember.create!(member_id: user2.id, channel_id: w2channel1.id, active: true)
    ChannelMember.create!(member_id: user5.id, channel_id: w2channel1.id, active: true)
    ChannelMember.create!(member_id: user4.id, channel_id: w2channel1.id, active: true)


    ChannelMember.create!(member_id: user2.id, channel_id: w2channel2.id, active: true)
    ChannelMember.create!(member_id: user5.id, channel_id: w2channel2.id, active: true)
    ChannelMember.create!(member_id: user4.id, channel_id: w2channel2.id, active: true)


    puts "creating private channels for members"
    u2w2dc = Channel.create!(owner_id: user2.id, workspace_id: workspace2.id, name: user2.id.to_s, is_channel: false, description: "This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)
    
    ChannelMember.create!(member_id: user2.id, channel_id: u2w2dc.id, active: true)

    u5w2dc = Channel.create!(owner_id: user5.id, workspace_id: workspace2.id, name: user5.id.to_s, is_channel: false, description:"This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)

    ChannelMember.create!(member_id: user5.id, channel_id: u5w2dc.id, active: true)

    u4w2dc = Channel.create!(owner_id: user4.id, workspace_id: workspace2.id, name: user4.id.to_s, is_channel: false, description: "This is your space. Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.", is_default: true)

    ChannelMember.create!(member_id: user4.id, channel_id: u4w2dc.id, active: true)
    puts "Done!"
  end