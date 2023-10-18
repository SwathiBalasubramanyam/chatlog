import { LuUserSquare } from "react-icons/lu";
import {BiSolidUserRectangle} from "react-icons/bi";
import { getWorkspaceMems } from "../../../store/workspaceMembers";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {MdLogout} from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import "./SideBarProfileComp.css";
import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/modal";
import * as sessionActions from "../../../store/session";

const SideBarProfileComp = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.currentUser);
    const workspaceMembers = useSelector(getWorkspaceMems);
    const workspaceMem = workspaceMembers[sessionUser.id] || {};

    const handleUserLogout = ()=>{
        dispatch(sessionActions.logout())
    }

    const handleUpdateProfile = () => {
        dispatch(modalActions.openModal("updateUser"));
    }

    const handleStatusUpdate = () => {

    }

    return (
        <div className="workspace-page-sidebar-profile-comp">
            <div className="workspace-sidebar-profile-img">
                <BiSolidUserRectangle></BiSolidUserRectangle>
            </div>
            <div className="workspace-sidebar-profile-content">
                <ul className="workspace-sidebar-profile-details">
                    <li className="user-profile-details">
                        <LuUserSquare></LuUserSquare>
                        <div className="user-other-details">
                            <div>{sessionUser.email}</div>
                            <div>{workspaceMem.status}</div>
                        </div>
                    </li>
                    <li className="workspace-sidebar-status-update" onClick={handleStatusUpdate}>
                        <AiOutlineEdit></AiOutlineEdit>
                        <div className="workspace-sidebar-status-update-text">Update Status</div>
                    </li>
                    <li className="workspace-sidebar-profile-update" onClick={handleUpdateProfile}>
                        <div>&#x1F642;</div>
                        <div className="workspace-sidebar-profile-update-text">Update Profile</div>
                    </li>
                    <li className="workspace-sidebar-profile-logout" onClick={handleUserLogout}>
                        <MdLogout></MdLogout>
                        <div className="workspace-sidebar-profile-logout-text">Logout from chatLog</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarProfileComp;