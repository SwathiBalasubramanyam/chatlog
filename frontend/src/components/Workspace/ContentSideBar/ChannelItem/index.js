import { useDispatch, useSelector } from "react-redux";
import "./ChannelItem.css";
import { getWorkspaceMems } from "../../../../store/workspaceMembers";
import { setCurrentChannel } from "../../../../store/session";
import * as messageActions from "../../../../store/messages";

const ChannelItem = ({channel}) => {
    const dispatch = useDispatch();
    const sessionChannel = useSelector((state) => state.session.currentChannel);
    const workspaceMembers = useSelector(getWorkspaceMems);
    let className = sessionChannel.id === channel.id ? "channel-item is-selected": "channel-item"
    let channelName = channel.name
    if(!channel.isChannel) {
        channelName = channel.memberIds.map(memId => workspaceMembers[memId]["email"]).join(", ")
    }

    const handleClick = () => {
        dispatch(messageActions.fetchMessages(channel.id)).then(() => {
            dispatch(setCurrentChannel(channel));
        })
    }

    return (
        <div className={className} onClick={handleClick}>
            <div className="channel-item-name">#    {channelName}</div>
        </div>
    )
}

export default ChannelItem;