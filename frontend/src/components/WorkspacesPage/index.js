import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from "react-router-dom";
import ChatLogLogo from "../ChatLogLogo";
import WorkspaceIndex from "./WorkspaceIndex";
import createWorkspaceIcon from "../../images/create-workspace-icon.svg";
import "./WorkspacesPage.css";
import * as modalActions from "../../store/modal";

const WorkspacesPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.currentUser);
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace)

    if(!sessionUser) return <Redirect to="/" />;
    
    if(sessionWorkspace) return <Redirect to={`/workspace/${sessionWorkspace.id}`}/>

    return (
        <div className="workspaces-index-page">
            <Link className="workspaces-logo-link" to="/"><ChatLogLogo/></Link>
            <div className="workspaces-index-header">
                <div>
                    <h4>Welcome back! </h4>
                    <h4><strong> You look nice today.</strong></h4>
                </div>  
                <div className="workspaces-index-subheader">Choose a workspace below to get back to working with your team.</div>
            </div>
            <WorkspaceIndex/>
            <div className="workspaces-create-form">
                <img className="create-workspace-icon" src={createWorkspaceIcon} alt="createWorkspace"></img>
                <div>Want to use Slack with a different team?</div>
                <button className="workspace-create-btn" onClick={() => dispatch(modalActions.openModal("createWorkspace"))}>Create Another Workspace</button>
            </div>
            
        </div>
    )
}

export default WorkspacesPage;