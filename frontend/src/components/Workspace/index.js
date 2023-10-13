import { useDispatch, useSelector } from "react-redux";
import {Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { setCurrentworkspace } from "../../store/session";
import { useEffect } from "react";
import { fetchWorkspaceMembers } from "../../store/workspaceMembers";
import { fetchChannels } from "../../store/channels";

const Workspace = () => {
    const dispatch = useDispatch();
    const {workspaceId} = useParams();
    const [sessionUser, sessionWorkspace, workspaceMembers, channels] = 
        useSelector((state) => {return [state.session.currentUser, state.session.currentWorkspace, 
            Object.values(state.workspaceMembers), Object.values(state.channels)]});

    const signoutFromWorkspace = () => {
        dispatch(setCurrentworkspace());
        
    }

    const handleUpdate = () => {

    }

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
        dispatch(fetchChannels(workspaceId))
    }, [])

    if (!sessionUser){
        return <Redirect to="/"></Redirect>
    }

    if (!sessionWorkspace){
        return <Redirect to="/signin/workspaces"></Redirect>
    }

    if(sessionWorkspace.id != workspaceId){
        return <Redirect to={`/workspace/${workspaceId}`}/>
    }

    return (
        <>
            <h1>Welcome to your workspace {`${workspaceId}`}</h1>
            <ul>List of members
                {workspaceMembers.map(workspaceMem => <li key={workspaceMem.id}>I am member and my id is {`${workspaceMem.id}`} and I am currently {`${workspaceMem.status}`}</li>)}
            </ul>

            <ul>List of channels
                {channels.map(channel => <li key={channel.id}>Hey this is channel {`${channel.name}`} and my description is {`${channel.description}`}</li>)}
            </ul>

            <button onClick={signoutFromWorkspace}>SignOutworkspace</button>
        </>
    )
}
export default Workspace;