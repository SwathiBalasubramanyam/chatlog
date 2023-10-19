import ChannelItem from "./ChannelItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getChannels } from "../../../store/channels";
import "./ContentSideBar.css";
import {AiOutlinePlus} from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/modal";
import { useEffect } from "react";
import { setCurrentChannel } from "../../../store/session";
import { fetchMessages } from "../../../store/messages";

const ContentSideBar = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const sessionChannel = useSelector((state) => state.session.currentChannel);
    const channels = Object.values(useSelector(getChannels));

    useEffect(() => {
        if(channels.length && !sessionChannel){
            let firstChannel = channels[0]
            dispatch(setCurrentChannel(firstChannel))
            dispatch(fetchMessages(firstChannel.id))
        }
    }, [sessionChannel, channels])

    if(!sessionChannel){
        return null
    }

    let actualChannels = [];
    let directMessages = [];
    channels.forEach(channel => {
        channel.isChannel ? actualChannels.push(channel) : directMessages.push(channel)
    });

    const handleCreateChannel = () => {
        dispatch(modalActions.openModal("createChannel"));
    }

    const handleCreateDirectMessage = () => {
        dispatch(modalActions.openModal("createDirectMessage"));
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
                    <AiOutlinePlus onClick={handleCreateDirectMessage}/>
                </div>
                <div className="all-dms-container">
                    {directMessages.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                </div>
            </div>
        </div>
    )
}

export default ContentSideBar;