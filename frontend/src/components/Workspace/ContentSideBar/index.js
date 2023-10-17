import ChannelItem from "./ChannelItem"

const ContentSideBar = ({workspace, channels}) => {

    return (
        <div className="content-sidebar">
            <div className="content-sidebar-header">
                <div>{workspace.name}</div>
            </div>
            <div className="content-sidebar-channels-section">
                <div className="channels-header hidden">Channels
                    <div className="channels-add">Create Channel</div>
                    <div className="channels-add">Edit Channel</div>
                </div>
                <div className="all-channels-container">
                    {channels.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>
        </div>
    )

}

export default ContentSideBar;