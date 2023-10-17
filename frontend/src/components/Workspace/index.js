import { useDispatch, useSelector } from "react-redux";
import {Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { setCurrentworkspace } from "../../store/session";
import { useEffect } from "react";
import { fetchWorkspaceMembers, getWorkspaceMems } from "../../store/workspaceMembers";
import { fetchChannels, getChannels } from "../../store/channels";
import ToolBar from "./ToolBar";
import SideBar from "./SideBar";
import ContentSideBar from "./ContentSideBar";

const Workspace = () => {
    const dispatch = useDispatch();
    const {workspaceId} = useParams();
    const sessionUser = useSelector((state) => state.session.currentUser);
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);

    let workspaceMembers = useSelector(getWorkspaceMems);
    const channels = Object.values(useSelector(getChannels))

    const workspaceMem = workspaceMembers[sessionUser.id];
        
    const signoutFromWorkspace = () => {
        dispatch(setCurrentworkspace());
    }
    
    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
        dispatch(fetchChannels(workspaceId))
    }, [workspaceId])
    
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
            <ToolBar/>
            <SideBar 
                user={sessionUser} 
                workspace={sessionWorkspace} 
                workspaceMem= {workspaceMem}/>

            <ContentSideBar 
                user={sessionUser}
                workspace={sessionWorkspace}
                channels={channels}/>

            <button onClick={signoutFromWorkspace}>SignOutworkspace</button>
        </>
    )
}
export default Workspace;