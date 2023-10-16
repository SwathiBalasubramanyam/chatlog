import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import * as workspaceMemberActions from "../../../store/workspaceMembers";

const WorkspaceItem = ({workspace}) => {
    const sessionUser = useSelector((state) => state.session.currentUser)
    const member = workspace.memberIds.includes(sessionUser.id)
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()
        if(member){
            dispatch(sessionActions.setCurrentworkspace(workspace))
        } else {
            dispatch(workspaceMemberActions.createWorkspaceMember({workspaceId: workspace.id}))
            dispatch(sessionActions.setCurrentworkspace(workspace))
        }
    }

    return (
        <>
            <h1>{workspace.id}</h1>
            <h4>{workspace.name}</h4>
            <button onClick={handleClick}>{member ? "launch": "join"}</button>
        </>
    )
}

export default WorkspaceItem;