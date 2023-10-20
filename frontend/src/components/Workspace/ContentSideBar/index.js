import ChannelItem from "./ChannelItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getChannels } from "../../../store/channels";
import "./ContentSideBar.css";
import {AiOutlinePlus} from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
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
        if(!sessionChannel && channels.length){
            let firstChannel = channels[0]
            dispatch(fetchMessages(firstChannel.id)).then(() => {
                dispatch(setCurrentChannel(firstChannel))
            })

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
                <div className="content-sidebar-header-text">
                    <strong>{sessionWorkspace.name}</strong>
                </div>
                <BiEdit onClick={handleCreateDirectMessage}></BiEdit>
            </div>

            <div className="content-sidebar-channels-section">
                <div className="channels-header"> Channels </div>
                <div className="all-channels-container">
                    {actualChannels.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                    <div className="add-channels" onClick={handleCreateChannel}>
                        <AiOutlinePlus/>Add Channels
                    </div>
                </div>
            </div>

            <div className="content-sidebar-dm-section">
                <div className="dm-header">
                    <div>Direct Messages</div>
                </div>
                <div className="all-dms-container">
                    {directMessages.map(channel => <ChannelItem key={channel.id} channel={channel}/>)}
                    <div className="add-dm-channels" onClick={handleCreateDirectMessage}>
                        <AiOutlinePlus/>Add Direct Messages
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentSideBar;