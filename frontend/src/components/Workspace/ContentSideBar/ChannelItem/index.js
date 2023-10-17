
const ChannelItem = ({channel}) => {
    return (
        <div className="channel-item">
            <div className="channel-item-logo">#</div>
            <div className="channel-item-name">{channel.name}</div>
        </div>
    )
}

export default ChannelItem;