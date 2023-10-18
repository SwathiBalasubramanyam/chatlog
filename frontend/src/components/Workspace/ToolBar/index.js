import "./ToolBar.css";
import {GoSearch} from "react-icons/go";
import {BiArrowBack} from "react-icons/bi";
import {IoMdArrowForward} from "react-icons/io";
import {RiChatHistoryLine} from "react-icons/ri";
import { useSelector } from "react-redux/es/hooks/useSelector";


const ToolBar = () => {
    const sessionWorkspace = useSelector((state) => state.session.currentWorkspace);

    return (
        <div className="workspace-toolbar">
            <div className="workspace-nav-left-container">
                <div className="workspace-history-btns">
                    <BiArrowBack></BiArrowBack>
                    <IoMdArrowForward></IoMdArrowForward>
                </div>
                <div className="workspace-history-menu-btn">
                    <RiChatHistoryLine></RiChatHistoryLine>
                </div>
            </div>
            <div className="workspace-nav-middle-container">
                <form className="workspace-nav-search-form">
                    <input className="workspace-nav-search-input" type="search" placeholder={`Search  ${sessionWorkspace.name}`}></input>
                    <GoSearch></GoSearch>
                </form>
            </div>
        </div>
    )
}

export default ToolBar;