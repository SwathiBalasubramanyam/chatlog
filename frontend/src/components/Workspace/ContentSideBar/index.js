import ChannelItem from "./ChannelItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getChannels } from "../../../store/channels";

const ContentSideBar = () => {
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const channels = Object.values(useSelector(getChannels));
    let actualChannels = [];
    let directMessages = [];

    channels.forEach(channel => {
        channel.isChannel ? actualChannels.push(channel) : directMessages.push(channel)
    });

    return (
        <div className="content-sidebar">
            <div className="content-sidebar-header">
                <div>{sessionWorkspace.name}</div>
            </div>
            <div className="content-sidebar-channels-section">
                <div className="channels-header">Channels
                    <div className="channels-header-cta hidden">
                        <div className="channels-add">Create Channel</div>
                        <div className="channels-edit">Edit Channel</div>
                        <div className="channels-leave">Leave Channel</div>
                    </div>
                </div>
                <div className="all-channels-container">
                    {actualChannels.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>

            <div className="content-sidebar-dm-section">
                <div className="dm-header">Direct Messages
                    <div className="dm-header-cta hidden">
                        <div className="dm-add">Create Message</div>
                    </div>
                </div>
                <div className="all-dms-container">
                    {directMessages.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>
        </div>
    )

}

export default ContentSideBar;