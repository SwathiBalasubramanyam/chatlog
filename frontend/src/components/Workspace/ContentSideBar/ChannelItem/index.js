import { useDispatch, useSelector } from "react-redux";
import "./ChannelItem.css";
import { getWorkspaceMems } from "../../../../store/workspaceMembers";
import { setCurrentChannel } from "../../../../store/session";

const ChannelItem = ({channel}) => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const sessionChannel = useSelector((state) => state.session.currentChannel);
    const workspaceMembers = useSelector(getWorkspaceMems);
    let className = sessionChannel.id === channel.id ? "channel-item is-selected": "channel-item"
    let channelName = channel.name
    if(!channel.isChannel) {
        channelName = channel.memberIds.map(memId => workspaceMembers[memId]["fullName"] || workspaceMembers[memId]["email"])
        channelName = channelName.join(", ")
    }

    const handleClick = () => {
        dispatch(setCurrentChannel(channel));
    }

    return (
        <div className={className} onClick={handleClick}>
            <div className="channel-item-name">#    {channelName}</div>
        </div>
    )
}

export default ChannelItem;