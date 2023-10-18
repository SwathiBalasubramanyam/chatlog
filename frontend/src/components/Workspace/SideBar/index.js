import "./SideBar.css";
import SideBarWorkspaceComp from "../SideBarWorkspaceComp";
import SideBarProfileComp from "../SideBarProfileComp";

const SideBar = () => {
    return (
        <div className="workspace-page-sidebar">
            <SideBarWorkspaceComp/>
            <SideBarProfileComp/>
        </div>
    )
}

export default SideBar;