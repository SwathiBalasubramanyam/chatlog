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

const MessagesComp = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector(state => state.session.currentWorkspace);
    const sessionUser = useSelector(state => state.session.currentUser);
    const sessionChannel = useSelector(state => state.session.currentChannel);
    const messages = Object.values(useSelector(getChannelMessages)) || [];
    const workspaceMembers = useSelector(getWorkspaceMems);

    const [messageText, setMessageText] = useState("")

    useEffect(() => {
        let sub;
        if(sessionChannel) {
            const sub = consumer.subscriptions.create(
                { channel: 'MessageChannel', channel_id: sessionChannel.id},
                { received: broadcast => {
                    dispatch(messageActions.receiveMessage(broadcast))
                }});
        }
        return () => sub?.unsubscribe();
    }, [])

    if(!sessionChannel || !Object.keys(workspaceMembers).length){
        return null
    }
    
    const isOwner = sessionUser.id === sessionChannel.ownerId;
    let channelName = sessionChannel.name
    if(!sessionChannel.isChannel) {
        channelName = sessionChannel.memberIds.map(memId => workspaceMembers[memId]["fullName"] || workspaceMembers[memId]["email"])
        channelName = channelName.join(", ")
    }

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
        dispatch(messageActions.createMessage(messageObj.channelId, messageObj))
        setMessageText("")
    }

    return (
        <div className="messages-section">
            <div className="messages-header">
                <div><strong>{channelName}</strong></div>
                <div>{sessionChannel.description || ""}</div>
                {isOwner && sessionChannel.isChannel && !sessionChannel.isDefault &&
                    <AiOutlineEdit onClick={(e) => dispatch(modalActions.openModal("updateChannel"))}/>
                }
                {isOwner && sessionChannel.isChannel && !sessionChannel.isDefault &&
                    <RiDeleteBinLine onClick={handleDelete}></RiDeleteBinLine>
                }
            </div>
            <div className="messages-container">
                {messages.map(message => {
                    let author = workspaceMembers[message.ownerId]
                    return (
                        <div className="message-item">
                            <div className="message-header">
                                {author.fullName || author.email}
                            </div>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    )
                })}

            </div>
            <div>
                <form onSubmit={handleCreateMessage}>
                    <input type="textarea" value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
                    <IoSendSharp onClick={handleCreateMessage}/>
                </form>
            </div>
        </div>
    )
}

export default MessagesComp;