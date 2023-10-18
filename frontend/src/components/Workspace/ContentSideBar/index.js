import ChannelItem from "./ChannelItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getChannels } from "../../../store/channels";
import "./ContentSideBar.css";
import * as messageActions from "../../../store/messages";
import {AiOutlinePlus, AiOutlineEdit} from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import * as modalActions from "../../../store/modal";
import consumer from "../../../consumer";

const ContentSideBar = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const channels = Object.values(useSelector(getChannels));
    const sessionChannel = useSelector((state) => state.session.currentChannel);
    let actualChannels = [];
    let directMessages = [];

    channels.forEach(channel => {
        channel.isChannel ? actualChannels.push(channel) : directMessages.push(channel)
    });

    if (!sessionChannel){
        dispatch(sessionActions.setCurrentChannel(actualChannels[0]))
        dispatch(messageActions.fetchMessages(actualChannels[0].id))
        const sub = consumer.subscriptions.create(
            { channel: 'MessageChannel', channel_id: actualChannels[0].id},
            { received: broadcast => {
                console.log("message received")
                console.log(broadcast);
                console.log(broadcast.body)
            }});
    }

    const handleCreateChannel = () => {
        dispatch(modalActions.openModal("createChannel"));
    }

    return (
        <div className="content-sidebar">
            <div className="content-sidebar-header">
                <div><strong>{sessionWorkspace.name}</strong></div>
            </div>

            <div className="content-sidebar-channels-section">
                <div className="channels-header">
                    <div>Channels</div>
                    <AiOutlinePlus onClick={handleCreateChannel}/>
                </div>

                <div className="all-channels-container">
                    {actualChannels.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>

            <div className="content-sidebar-dm-section">
                <div className="dm-header">
                    <div>Direct Messages</div>
                    <AiOutlinePlus/>
                </div>
                <div className="all-dms-container">
                    {directMessages.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>
        </div>
    )

}

export default ContentSideBar;