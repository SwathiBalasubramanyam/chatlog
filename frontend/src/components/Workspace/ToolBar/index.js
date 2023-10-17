import { useDispatch } from "react-redux";
import "./ToolBar.css";
import * as sessionActions from "../../../store/session"

const ToolBar = () => {
    const dispatch = useDispatch();

    return (
        <div className="workspace-toolbar">
            <div className="workspace-nav-left-container">
                <div className="workspace-history-btns">
                    <button className="workspace-back-in-history">Back</button>
                    <button className="workspace-forward-in-history">Forward</button>
                </div>
                <div className="workspace-history-menu-btn">
                    <button className="history-menu-btn">History</button>
                </div>
            </div>
            <div className="workspace-nav-middle-container">
                <form className="workspace-nav-search-form">
                    <input type="search" placeholder="Search..."/>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="workspace-nav-right-container">
                <button onClick={() => dispatch(sessionActions.logout())}>Logout</button>
                <div className="workspace-help-section">
                    <button className="workspace-help-btn">Help</button>
                </div>
            </div>
        </div>
    )
}

export default ToolBar;