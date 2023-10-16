import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from "react-router-dom";
import { fetchWorkspaces, getWorkspaces } from "../../store/workspaces";
import ChatLogLogo from "../ChatLogLogo";

const WorkspacesPage = () => {
    const dispatch = useDispatch();
    const [sessionUser, sessionWorkspace] = useSelector((state) => {
        return [state.session.currentUser, state.session.currentWorkspace]
    });
    const workspaces = Object.values(useSelector(getWorkspaces));

    useEffect(() => {if(sessionUser) dispatch(fetchWorkspaces())}, [])
    
    if(!sessionUser) return <Redirect to="/" />;
    
    if(sessionWorkspace) return <Redirect to={`/workspace/${sessionWorkspace.id}`}/>
    return (
        <div className="workspaces-index-page">
            <Link className="workspaces-logo-link" to="/"><ChatLogLogo/></Link>
            <div className="workspaces-index-header">
                <h2><purple>Welcome back!</purple><strong>You look nice today.</strong></h2>
                <div>Choose a workspace below to get back to working with your team.</div>
            </div>
            <div className="workspaces-list">

            </div>
            
        </div>
    )
}

export default WorkspacesPage;