import { useDispatch, useSelector } from "react-redux";
import {Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react";
import { fetchWorkspace } from "../../store/workspaces";
import ToolBar from "./ToolBar";
import SideBar from "./SideBar";
import ContentSideBar from "./ContentSideBar";
import "./Workspace.css";

const Workspace = () => {
    const dispatch = useDispatch();
    const {workspaceId} = useParams();
    const sessionUser = useSelector((state) => state.session.currentUser);
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);

    useEffect(() => {
        dispatch(fetchWorkspace(workspaceId))
    }, [dispatch, workspaceId])
    
    if (!sessionUser){
        return <Redirect to="/"></Redirect>
    }
    
    if (!sessionWorkspace){
        return <Redirect to="/signin/workspaces"></Redirect>
    }
    
    if(sessionWorkspace.id != workspaceId){
        return <Redirect to={`/workspace/${sessionWorkspace.id}`}/>
    }

    return (
        <div className="workspace-page">
            <ToolBar/>
            <div className="workspace-main-page-content">
                <SideBar/>
                <ContentSideBar/>
                <div className="messages-section"></div>
            </div>
        </div>
    )
}
export default Workspace;