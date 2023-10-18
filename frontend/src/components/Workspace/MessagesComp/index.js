import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceMems } from "../../../store/workspaceMembers";
import {IoSendSharp} from "react-icons/io5";
import {AiOutlineEdit} from "react-icons/ai";
import {BsPersonAdd} from "react-icons/bs";
import * as modalActions from "../../../store/modal";
import * as channelActions from "../../../store/channels";
import {RiDeleteBinLine} from "react-icons/ri";

const MessagesComp = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector(state => state.session.currentWorkspace);
    const sessionUser = useSelector(state => state.session.currentUser);
    const sessionChannel = useSelector(state => state.session.currentChannel);
    const workspaceMembers = useSelector(getWorkspaceMems);
    const isOwner = sessionUser.id === sessionChannel.ownerId;

    let channelName = sessionChannel.name
    if(!sessionChannel.isChannel) {
        channelName = sessionChannel.memberIds.map(memId => workspaceMembers[memId]["fullName"] || workspaceMembers[memId]["email"])
        channelName = channelName.join(", ")
    }

    const handleDelete = () => {
        dispatch(channelActions.deleteChannel(sessionWorkspace.id, sessionChannel.id))
    }

    const handleLeaveChannel = () => {

    }

    return (
        <div className="messages-section">
            <div className="messages-header">
                <div><strong>{channelName}</strong></div>
                <div>{sessionChannel.description || ""}</div>
                {isOwner && sessionChannel.isChannel &&
                    <AiOutlineEdit onClick={(e) => dispatch(modalActions.openModal("updateChannel"))}/>
                }
                {isOwner && sessionChannel.isChannel && 
                    <RiDeleteBinLine onClick={handleDelete}></RiDeleteBinLine>
                }
                {sessionChannel.isChannel && <div onClick={handleLeaveChannel}>Leave Channel</div>}

            </div>
            <div className="messages-container">

            </div>
            <div>
                <form>
                    <input type="textarea">
                    </input>
                    <IoSendSharp></IoSendSharp>
                </form>
            </div>
        </div>
    )
}

export default MessagesComp;