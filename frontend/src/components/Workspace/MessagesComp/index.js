import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceMems } from "../../../store/workspaceMembers";
import {IoSendSharp} from "react-icons/io5";
import {AiOutlineEdit} from "react-icons/ai";
import {BiSolidUserRectangle} from "react-icons/bi";
import * as messageActions from "../../../store/messages";
import * as modalActions from "../../../store/modal";
import * as channelActions from "../../../store/channels";
import {RiDeleteBinLine} from "react-icons/ri";
import { getChannelMessages } from "../../../store/messages";
import { useState } from "react";
import consumer from "../../../consumer";
import { useEffect } from "react";
import "./MessagesComp.css"

const MessagesComp = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector(state => state.session.currentWorkspace);
    const sessionUser = useSelector(state => state.session.currentUser);
    const sessionChannel = useSelector(state => state.session.currentChannel);
    const messages = Object.values(useSelector(getChannelMessages)) || [];
    const workspaceMembers = useSelector(getWorkspaceMems);

    const [messageText, setMessageText] = useState("")
    const [isOwner, setIsOwner] = useState("")
    const [channelName, setChannelName] = useState("")
    const [memberCnt, setMemberCnt] = useState(0)

    useEffect(() => {
        let sub;
        if(sessionChannel){
            sub = consumer.subscriptions.create(
                { channel: 'MessageChannel', channel_id: sessionChannel.id},
                { received: broadcast => dispatch(messageActions.receiveMessage(broadcast))});

            setIsOwner(sessionUser.id === sessionChannel.ownerId)

            let channelName = "# " + sessionChannel.name
            if(!sessionChannel.isChannel) {
                channelName = sessionChannel.memberIds.map(memId => workspaceMembers[memId]["email"]).join(", ")
            }
            setChannelName(channelName)
            setMemberCnt(sessionChannel.memberIds.length)
        }
        return () => sub?.unsubscribe()
    }, [sessionChannel])

    const handleDelete = () => {
        dispatch(channelActions.deleteChannel(sessionWorkspace.id, sessionChannel.id))
    }

    const handleCreateMessage = (e) => {
        e.preventDefault();
        let messageObj = {
            text: messageText,
            ownerId: sessionUser.id,
            channelId: sessionChannel.id
        }
        dispatch(messageActions.createMessage(messageObj.channelId, messageObj));
        setMessageText("");
    }
    
    return (sessionWorkspace && sessionChannel && sessionChannel.workspaceId == sessionWorkspace.id) ? (
        <div className="messages-section">
            <div className="messages-header">
                <div className="messages-header-channel-name"><strong>{channelName}</strong>
                    <div className="messages-header-channel-name-details">

                        {isOwner && sessionChannel.isChannel && !sessionChannel.isDefault &&
                            <AiOutlineEdit onClick={(e) => dispatch(modalActions.openModal("updateChannel"))}/>
                        }
                        {isOwner && sessionChannel.isChannel && !sessionChannel.isDefault &&
                            <RiDeleteBinLine onClick={handleDelete}></RiDeleteBinLine>
                        }
                        {sessionChannel.isChannel && !sessionChannel.isDefault && 
                            <BiSolidUserRectangle onClick={(e) => dispatch(modalActions.openModal("addMembers"))}></BiSolidUserRectangle>
                        }
                    </div>
                    <div className="messages-header-channel-member-details">
                        {sessionChannel.memberIds.map(id => <BiSolidUserRectangle/>)} {memberCnt} {memberCnt > 1 ? "members": "member"}
                    </div>
                </div>
                <div className="messages-header-channel-description">{sessionChannel.description || ""}</div>
                
            </div>
            <div className="messages-container">
                {messages.map(message => {
                    let author = workspaceMembers[message.ownerId] || {}
                    return (
                        <div className="message-item" key={message.id}>
                            <div className="user-icon"><BiSolidUserRectangle/></div>
                            <div className="message-header">
                                <strong>{author.email}</strong>
                                <div className="message-content">
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="composer-page-footer">
                <form className="composer-page-form" onSubmit={handleCreateMessage}>
                    <input className="composer-page-input" type="textarea" value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
                    <IoSendSharp onClick={handleCreateMessage}/>
                </form>
            </div>
        </div>
    ) : null
}

export default MessagesComp;