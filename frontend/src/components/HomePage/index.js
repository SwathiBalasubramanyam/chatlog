import HomePageNavBar from "../HomePageNavBar";
import HomePageMaincontent from "../HomePageMainContent";
import "./HomePage.css";
import {useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const HomePage = () => {
    const links = {
        linkedinHandle: "https://www.linkedin.com/in/swathi-balasubramanyam-4a4280124/",
        githubHandle: "https://github.com/SwathiBalasubramanyam"
    }

    const sessionUser = useSelector(state => state.session.currentUser)
    if(sessionUser){
        return <Redirect to="/signin/workspaces"/>
    }

    return(
        <main className="home-page">
            <HomePageNavBar links={links}></HomePageNavBar>
            <HomePageMaincontent links={links}></HomePageMaincontent>
        </main>
    )
}

export default HomePage;