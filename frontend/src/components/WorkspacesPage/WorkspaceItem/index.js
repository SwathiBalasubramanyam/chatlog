import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import * as workspaceMemberActions from "../../../store/workspaceMembers";
import * as channelActions from "../../../store/channels";
import "./WorkspaceItem.css";

const WorkspaceItem = ({workspace}) => {
    const sessionUser = useSelector((state) => state.session.currentUser)
    const member = workspace.memberIds.includes(sessionUser.id)
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()
        if(member){
            dispatch(sessionActions.setCurrentworkspace(workspace))
            dispatch(workspaceMemberActions.fetchWorkspaceMembers(workspace.id))
            dispatch(channelActions.fetchChannels(workspace.id))
        } else {
            dispatch(workspaceMemberActions.createWorkspaceMember({workspaceId: workspace.id}))
            dispatch(sessionActions.setCurrentworkspace(workspace))
            dispatch(workspaceMemberActions.fetchWorkspaceMembers(workspace.id))
            dispatch(channelActions.fetchChannels(workspace.id))
        }
    }

    let workspaceIcon = workspace.icon || "";
    if (!workspaceIcon) {
        workspaceIcon = workspace.name.toUpperCase().slice(0,2)
    }

    return (
        <li className="workspace-item">
            <div className="workspace-item-icon">{workspaceIcon}</div>
            <div className="workspace-item-name"><strong>{workspace.name}</strong></div>
            <button className="workspace-item-cta" onClick={handleClick}>{member ? "launch": "join"}</button>
        </li>
    )
}

export default WorkspaceItem;