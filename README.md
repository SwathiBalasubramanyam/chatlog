# README

# ChatLog
## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Highlighted Features](#highlighted-features)
  - [Creating default channels](#creating-default-channels)
  - [Channel vs Direct Message](#channel-vs-direct-message)
- [Future Directions](#future-directions)
---
## Overview
ChatLog is a full stack clone of the popular business messaging application, Slack. Slack is a workplace communication tool that allows users to collaborate and connect with one another through a variety of ways. Inspired by Slack, the core feature of ChatLog is the ability to send messages to another user or to a channel they have access to. 
---
## Live Demo
Check out the live website [here](https://chatlog.onrender.com/).
---
## Technologies Used
- React.js
- JavaScript
- Ruby on Rails
- Jbuilder
- PostgreSQL
- ActionCable(Websockets)
- Redux
- HTML
- CSS
- Hosted through Render
---
## Features

#### 1. User Authentication
Users can signup, sign-in, logout.
Users can use demo login to try the site.
#### 2. Work-spaces 
Users are able to create a workspace.
User will be an admin(if workspace created by them)/member.
All workspace members can read/retrieve a workspace.
Admins can edit a workspace, members don't have the permissions to edit.
#### 3. Channels
General and random channels are created by default and all the members of the workspace are automatically added to these channels when they join a workspace.
Users of a workspace can create a channel within the workspace and add members from the workspace.
All members of a channel are given permission to read a channel, whereas update and delete can be done only by the admin of a channel.
#### 4. Direct Messages
Direct messages are a type of channel.
Any member of the workspace can create a direct messages channel.
Ability to add a member of the work-space into the channel.
A default direct message channel, with only user as member is created.
### 5. Messages
Users have the ability to create a Message in the channel/direct messages channel or as a reply to the message.
channel members can read the messages.

## Highlighted Features
#### Creating default channels
When creating a workspace, backend also creates few default channels, a direct message for the user and adds an association to the user and channel. This association is then used to identify the members of a channel and access is restricted based on that. Adding channel members can happen in two different ways when creating a workspace or adding a member to a workspace.
#### Code Snippets
```ruby
    def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id = @current_user.id
    if @workspace.save
      WorkspaceMember.create!(member_id: @current_user.id, workspace_id: @workspace.id, role: "admin")

      wchannel1 = Channel.create!(owner_id: @current_user.id, workspace_id: @workspace.id, 
        name: :general, description: "This channel is for team-wide communication and announcements. All team members are in this channel.", is_default: true)
      ChannelMember.create!(member_id: @current_user.id, channel_id: wchannel1.id, active: true)
      render "api/workspaces/create"
    else
      render json: {errors: @workspace.errors.full_messages}, status: :unprocessable_entity
    end
  end

```
#### channel vs Direct Message:
I have 
#### Code Snippets
```javascript
  const handleAddMembers = (e) => {
        let memberIds = Object.keys(selectedMemList)
        if(!memberIds.length){
            dispatch(modalActions.closeModal())
        }

        let newChannelMems = [...memberIds]
        newChannelMems.push(sessionUser.id)
        let chName = newChannelMems.sort().join("")

        if(directMessage){
            let alreadyExists = Object.values(channels).filter(ch => ch.name === chName)
            if(alreadyExists.length){
                dispatch(setCurrentChannel(alreadyExists[0]))
                dispatch(modalActions.closeModal());
            } else {
                dispatch(channelActions.createChannel(sessionChannel.workspaceId, {
                    name: chName,
                    description: "This is the very beginning of your direct message history with ",
                    is_channel: false,
                    is_default: false
                })).then((data) => {
                    dispatch(channelMemberActions.createChannelMembers(data.channel.id, memberIds)).then(() => dispatch(modalActions.closeModal()))
                })
            }
        } else {
            dispatch(channelMemberActions.createChannelMembers(sessionChannel.id, memberIds)).then(() => dispatch(modalActions.closeModal()))
        }
    }
```
##### Explanation
The Jbuilder code is what is sent to the front end to be used as a data base for react componenets.
- The first step is seperating the @products into many products, and extracting the same data for each
- Then, I extract the id, title, description, and other information about each product
- I also extract information about the products such as the user that the proudct belongs to, as well as the category that the product belongs to
- The above point would usually cause more fetches to get this information, but the next section of code shows how it is all being fetched at once
The Products Controller will control what gets sent to the jbuilder when index route is called
- The frist thing that is done is @products is being initialzed by calling Proudct.all, which is all of the products.
- In the middle however, we are also calling .includes(:category, :user). What this will do is preload the category and user associations/information attached to the products. This will cause only one fetch as we have all the information that the Jbulider is asking for
---
### Dynamic Shopping Cart
#### Challenges
Implementing a shopping cart that was both user-specific and CRUD-capable was a considerable challenge.
#### Solutions
For tracking cart items based on the user, I utilized Rails sessions tied to unique user IDs. CRUD operations were then handled using Rails routes and controllers to ensure a seamless user experience.
##### Code Snippets
```javascript

```
##### Explanation

## Future Directions
- Ability to leave a channel
- Subscribe to a workspace and notify user of all actions
- Ability to react to a message and respond to a message
- Search across the workspace for any text or email
- Sharing files as part of a message.
- Ability to upload pictures.
- Add @mentions
- Open thread message in a sidebar
- support formatting messages.
- Ability to edit or delete a message.