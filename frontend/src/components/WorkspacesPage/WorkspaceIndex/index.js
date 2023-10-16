import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { fetchWorkspaces, getWorkspaces } from "../../store/workspaces";
import WorkspaceItem from "../WorkspaceItem";
import WorkspaceForm from "../WorkspaceForm";

const WorkspaceIndex = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => {
        return state.session.currentUser
    });

    const sessionWorkspace = useSelector((state) => {
        return state.session.currentWorkspace
    })

    const workspaces = useSelector(getWorkspaces());

    useEffect(() => {
        if(sessionUser){
            dispatch(fetchWorkspaces());
        }
    }, [])
    
    if(!sessionUser) {
        return <Redirect to="/" />;
    } 
    
    if(sessionWorkspace) {
        return <Redirect to={`/workspace/${sessionWorkspace.id}`}/>
    } else {
        return (
            <>
                <h1>Welcome to Workspaces home page !!</h1>
                <ul>
                    {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace}/>)}
                </ul>
                <WorkspaceForm/>
            </>
        )
    }
}

export default WorkspaceIndex;