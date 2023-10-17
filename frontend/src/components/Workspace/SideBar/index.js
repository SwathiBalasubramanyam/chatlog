
const SideBar = ({user, workspace, workspaceMem}) => {
    return (
        <div className="workspace-sidebar">
            <div className="workspace-sidebar-icon">{workspace.name.slice(0,2)}</div>
            <div className="workspace-sidebar-icon-details hidden">
                <div className="workspace-sidebar-icon-header">
                    <div>{workspace.name}</div>
                    <div>{workspace.url}</div>
                </div>
                <div className="workspace-sidebar-icon-add">
                    <div className="workspace-sidebar-icon-add-btn">plus button</div>
                    <div className="workspace-sidebar-icon-add-text">Add a workspace</div>
                </div>

                <div className="workspace-sidebar-icon-edit">
                    <div className="workspace-sidebar-icon-edit-btn">Edit</div>
                    <div className="workspace-sidebar-icon-edit-text">Edit a workspace</div>
                </div>
            </div>

            <div className="workspace-sidebar-home">
                <button>Home</button>
            </div>

            <div className="workspace-sidebar-profile-icon">
                <div className="workspace-sidebar-profile-img">{user.email}</div>
                <div className="workspace-sidebar-profile-details hidden">
                    <div className="user-profile-details">
                        <div>userImg</div>
                        <div className="user-other-details">
                            <div>{user.email}</div>
                            <div>{workspaceMem ? workspaceMem.status : ""}</div>
                        </div>
                    </div>
                    <button>Update status</button>
                    <button>Edit profile</button>
                </div>
            </div>

        </div>
    )
}

export default SideBar;