import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceMems } from "../../store/workspaceMembers";
import { useEffect, useState } from "react";
import { fetchWorkspace } from "../../store/workspaces";
import * as channelActions from "../../store/channels";
import * as channelMemberActions from "../../store/channelMembers";
import * as modalActions from "../../store/modal";
import { getChannels } from "../../store/channels";
import { setCurrentChannel } from "../../store/session";
import "./AddMemberForm.css";

const AddMemberForm = ({directMessage=false}) => {
    const dispatch = useDispatch();
    const workspaceMembers = useSelector(getWorkspaceMems);
    const sessionChannel = useSelector(state => state.session.currentChannel)
    const channels = useSelector(getChannels);
    const sessionUser = useSelector(state => state.session.currentUser);
    const [matchedMemList, setMatchedMemList] = useState([]);
    const [selectedMemList, setSelectedMemList] = useState({});
    const [channelMembers, setChannelMembers] = useState([])
    
    useEffect(()=> {
        dispatch(fetchWorkspace(sessionChannel.workspaceId)).then(() => {
            setChannelMembers(sessionChannel.memberIds)
        })
    }, [sessionChannel])

    const getSearchMemList = () => {
        return Object.values(workspaceMembers).filter(
            member => {
                if(directMessage){
                    return member.memberId !== sessionUser.id && !selectedMemList[member.memberId]
                } else {
                    return member.memberId  !== sessionUser.id && !selectedMemList[member.memberId] && !channelMembers.includes(member.memberId)
                }
            }
        );
    }

    const  autocompleteMatch = (input) => {
        if (input == '') return [];
        let reg = new RegExp(input)
        return getSearchMemList().filter(member => member.email.toLowerCase().match(reg));
    }

    const handleOnChange = (e) => {
        setMatchedMemList(autocompleteMatch(e.target.value.toLowerCase()));
    }

    const handleSelectMembers = (e) => {
        setSelectedMemList({...selectedMemList, [e.target.value]: workspaceMembers[e.target.value]["email"]})
    }

    const handleAddMembers = (e) => {
        let memberIds = Object.keys(selectedMemList)
        if(!memberIds.length){
            dispatch(modalActions.closeModal())
        }

        let newChannelMems = [...memberIds]
        newChannelMems.push(sessionUser.id)
        let chName = newChannelMems.sort().join("")

        if(directMessage){
            let alreadyExists = Object.values(channels).filter(ch => ch.name === chName)
            if(alreadyExists.length){
                dispatch(setCurrentChannel(alreadyExists[0]))
                dispatch(modalActions.closeModal());
            } else {
                dispatch(channelActions.createChannel(sessionChannel.workspaceId, {
                    name: chName,
                    description: "This is the very beginning of your direct message history with ",
                    is_channel: false,
                    is_default: false
                })).then((data) => {
                    dispatch(channelMemberActions.createChannelMembers(data.channel.id, memberIds)).then(() => dispatch(modalActions.closeModal()))
                })
            }
        } else {
            dispatch(channelMemberActions.createChannelMembers(sessionChannel.id, memberIds)).then(() => dispatch(modalActions.closeModal()))
        }
    }

    return (
        <div className="add-member-form">
            <div className="selected-members-container">
                <div className="selected-members-holder">
                    {Object.values(selectedMemList).join(" ")}
                </div>
                
            </div>
            <div className="search-members-conatiner"> Search members by email
                <div className="search-members-container-input">
                    <input type="text" placeholder="Enter email"onChange={handleOnChange}>
                    </input>
                    <button onClick={handleAddMembers}>Add Members</button>
                </div>
                {matchedMemList.map(mem => {
                    return (
                        <li key={mem.memberId} value={mem.memberId} onClick={handleSelectMembers}>{mem.email}</li>
                    )
                })}
            </div>
        </div>
    )

}

export default AddMemberForm