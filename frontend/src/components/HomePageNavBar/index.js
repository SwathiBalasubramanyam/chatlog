import { Link } from "react-router-dom";
import SlackLogo from "../../images/slack-logo.png";
import "./HomePageNavBar.css"

const HomePageNavBar = ({links}) => {
    return (
        <nav className="home-page-nav-bar">
            <div className="logo-links">
                <img src={SlackLogo} alt="slacklogo"></img>
                <div className="title">ChatLog</div>
                <div className="personal-links">
                    <a href={links.githubHandle} target="_blank">Github</a>
                    <a href={links.linkedinHandle} target="_blank">linkedin</a>
                </div>
            </div>
            <nav className="nav-list">
                <Link to="/signin"> Sign in </Link>
                <Link to="/demo-signin"> TRY A DEMO </Link>
                <Link to="/get-started"> SIGNUP HERE </Link>
            </nav>
        </nav>
    )
}

export default HomePageNavBar;