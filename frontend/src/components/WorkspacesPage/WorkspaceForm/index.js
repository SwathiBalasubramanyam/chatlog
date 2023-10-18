import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as workspaceActions from "../../../store/workspaces";
import "./WorkspaceForm.css";
import * as modalActions from "../../../store/modal";

const WorkspaceForm = ({edit=false}) => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const [name, setName] = useState(edit ? sessionWorkspace.name : "");
    const [url, setUrl] = useState(edit? sessionWorkspace.url : "");
    const [icon, setIcon] = useState(edit? sessionWorkspace.icon : "");

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(modalActions.closeModal());
        if (edit) {
            dispatch(workspaceActions.updateWorkspace({...sessionWorkspace, name: name, url: url, icon: icon}));
        } else {
            dispatch(workspaceActions.createWorkspace({name: name, url: url || `${name}/chatlog.com`, icon: icon || `${name.slice(0,2).toUpperCase()}`}));
        }
    }

    return (
        <form className="create-workspace-form" onSubmit={handleCreate}>
            <div><strong>What's the name of your company or team?</strong></div>
            <div>This will be the name of your ChatLog workspace, choose something that your team will recognize.</div>
            <input type="text" onChange={(e) => setName(e.target.value)} 
                value={name} placeholder="Company or team name">
            </input>
            <div><strong>Workspace Url</strong></div>
            <div>This will be your workspace url, set by default to workspacename/chatlog.com.</div>
            <input type="text" onChange={(e) => setUrl(e.target.value)} 
                value={url} placeholder="Workspace Url">
            </input>

            <div><strong>Workspace Icon</strong></div>
            <div>This will be your workspace icon, set by default to first two letters of the workspace.</div>
            <input type="text" onChange={(e) => setIcon(e.target.value)} 
                value={icon} placeholder="Workspace Icon">
            </input>

            <button className="create-workspace-btn" onClick={handleCreate}>{edit ? "Edit Workspace" : "Create Workspace"}</button>
        </form>
    )
}

export default WorkspaceForm;