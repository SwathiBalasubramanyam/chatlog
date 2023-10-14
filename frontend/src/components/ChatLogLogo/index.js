import logo from "../../images/slack-logo.png";
import "./ChatLogLogo.css";

const ChatLogLogo = () => {
    return (
        <div className="chatlog-logo">
            <img className="chatlog-logo-logo" src={logo} alt="chatLog"></img>
            <div className="chatlog-logo-text"><strong>ChatLog</strong></div>
        </div>
    )
}

export default ChatLogLogo;