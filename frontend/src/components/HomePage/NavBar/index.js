import { useDispatch, useSelector } from "react-redux"
import ChatLogLogo from "../../ChatLogLogo"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../../store/session"
import "./NavBar.css"
import * as modalActions from "../../../store/modal"

const SignedOutComponent = () => {
    const dispatch = useDispatch();

    return (
        <div className="div-nav-list">
            <Link to="/signin">Sign In</Link>
            <button className="try-demo-btn" onClick={() => dispatch(modalActions.openModal("demo"))}>TRY A DEMO</button>
            <Link to="/get-started">SIGNUP HERE</Link>
        </div>
    )
}

const TechnologiesUsed = () => {
    return (
        <div className="footer-tech-used">TECHNOLOGIES USED
            <div>
                <div>Ruby/Rails</div>
                <div>PSQL</div>
                <div>Javascript</div>
                <div>Jbuilder</div>
                <div>React/Redux</div>
                <div>HTML/CSS</div>
            </div>
        </div>
    )
}

const PersonalLinks = ({personalLinks}) => {
    return (
        <div className="personal-links">
            {Object.entries(personalLinks).map((link, idx) => <a key={idx} href={link[1]} target="_blank">{link[0]}</a>)}
        </div>
    )
}

const NavBar = ({header=false, background="purple"}) => {
    const personalLinks = {
        Linkedin: "https://www.linkedin.com/in/swathi-balasubramanyam-4a4280124/",
        Github: "https://github.com/SwathiBalasubramanyam"
    }
    const sessionUser = useSelector(state => state.session.currentUser)
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(sessionActions.logout())

    return (
        <nav className={`home-page-nav-bar-background ${background} ${header ? "header" : "footer"}`}>
            <div className="home-page-nav-bar-foreground">
                <div className={`logo-links ${header ? "header" : "footer"}`}>
                    <ChatLogLogo/>
                    <PersonalLinks personalLinks={personalLinks}/>
                </div>
                {sessionUser && header && <button className="btn-logout" onClick={handleLogout}>LOGOUT</button>}
                {!sessionUser && header && <SignedOutComponent/>}
                {!header && <TechnologiesUsed/>}
            </div>
        </nav>
    )
}

export default NavBar