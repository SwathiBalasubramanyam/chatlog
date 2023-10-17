import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkspaces, getWorkspaces } from "../../../store/workspaces";
import WorkspaceItem from "../WorkspaceItem";
import "./WorkspaceIndex.css";

const WorkspaceIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.currentUser);
    const workspacesObj = useSelector(getWorkspaces);
    const workspaces = workspacesObj ? Object.values(workspacesObj) : [];

    useEffect(() => {if(sessionUser) dispatch(fetchWorkspaces())}, [])
    
    return (
        <ul className="workspaces-list">
            <li className="workspace-list-header" >Workspaces for <strong>{sessionUser.email}</strong></li>
            {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace}/>)}
        </ul>
    )
    
}

export default WorkspaceIndex;