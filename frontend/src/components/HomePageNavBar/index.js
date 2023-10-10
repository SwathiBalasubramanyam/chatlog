import { Link } from "react-router-dom";
import SlackLogo from "../../images/Slack-mark-RGB.png";
import "./HomePageNavBar.css"

const HomePageNavBar = () => {
    return (
        <nav className="home-page-nav-bar">
            <div className="slack-logo">
                <img src={SlackLogo} alt="SLACK"></img>
                <div className="title">ChatLog</div>
            </div>
            <nav className="nav-list">
                <ul>
                    <li> Features </li>
                    <li> Solutions </li>
                    <li> Enterprise </li>
                    <li> Resources </li>
                    <li> Pricing </li>
                </ul>
                <div className="nav-signed-out">
                    <Link to="/signin"> Sign in </Link>
                    <Link to="/demo-signin"> DEMO USER </Link>
                    <Link to="/get-started"> TRY FOR FREE </Link>
                </div>
            </nav>
        </nav>
    )
}

export default HomePageNavBar;