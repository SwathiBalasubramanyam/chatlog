import { useState } from "react";
import { useDispatch } from "react-redux";
import * as workspaceActions from "../../../store/workspaces";
import "./WorkspaceForm.css";
import * as modalActions from "../../../store/modal";

const WorkspaceForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [icon, setIcon] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(modalActions.closeModal());
        dispatch(workspaceActions.createWorkspace({name: name, url: url, icon: icon}));
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
                value={url || name ? `${name}/chatlog.com`: ""} placeholder="Workspace Url">
            </input>

            <div><strong>Workspace Icon</strong></div>
            <div>This will be your workspace icon, set by default to first two letters of the workspace.</div>
            <input type="text" onChange={(e) => setIcon(e.target.value)} 
                value={icon || `${name.slice(0,2).toUpperCase()}`} placeholder="Workspace Icon">
            </input>

            <button className="create-workspace-btn" onClick={handleCreate}>Create Workspace</button>
        </form>
    )
}

export default WorkspaceForm;