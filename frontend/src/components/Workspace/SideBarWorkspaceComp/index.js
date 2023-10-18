import {AiOutlinePlus, AiOutlineEdit} from "react-icons/ai";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./SideBarWorkspaceComp.css"
import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/modal";
import { setCurrentChannel, setCurrentworkspace } from "../../../store/session";
import {MdLogout} from "react-icons/md";

const SideBarWorkspaceComp = () => {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);
    const sessionUser = useSelector((state) => state.session.currentUser);

    const handleAddWorkspace = () => {
        dispatch(modalActions.openModal("createWorkspace"));
    }

    const handleEditWorkspace = (e) => {
        if(sessionUser.id === sessionWorkspace.ownerId){
            dispatch(modalActions.openModal("editWorkspace"));
        }
    }

    const signoutFromWorkspace = () => {
        dispatch(setCurrentChannel());
        dispatch(setCurrentworkspace());
    }

    return (
        <div className="workspace-page-sidebar-workspace-comp">
            <div className="workspace-sidebar-wicon">{sessionWorkspace.icon || sessionWorkspace.name.slice(0,2).toUpperCase()}</div>
            <div className="workspace-sidebar-wicon-content">
                <ul className="workspace-sidebar-wicon-details">
                    <li className="workspace-sidebar-wicon-header">
                        <div>{sessionWorkspace.name}</div>
                        <div>{sessionWorkspace.url}</div>
                    </li>
                    <li className="workspace-sidebar-wicon-add" onClick={handleAddWorkspace}>
                        <AiOutlinePlus></AiOutlinePlus>
                        <div className="workspace-sidebar-wicon-add-text">Add a workspace</div>
                    </li>

                    <li className="workspace-sidebar-wicon-edit" onClick={handleEditWorkspace}>
                        <AiOutlineEdit></AiOutlineEdit>
                        <div className="workspace-sidebar-wicon-edit-text">Edit workspace</div>
                    </li>
                    <li className="workspace-sidebar-wicon-logout" onClick={signoutFromWorkspace}>
                        <MdLogout></MdLogout>
                        <div className="workspace-sidebar-wicon-logout-text">Logout from workspace</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarWorkspaceComp;