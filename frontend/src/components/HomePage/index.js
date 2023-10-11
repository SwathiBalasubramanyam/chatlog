import HomePageNavBar from "../HomePageNavBar";
import HomePageMaincontent from "../HomePageMainContent";
import "./HomePage.css";
import {useState } from "react";

const HomePage = () => {
    const links = {
        linkedinHandle: "https://www.linkedin.com/in/swathi-balasubramanyam-4a4280124/",
        githubHandle: "https://github.com/SwathiBalasubramanyam"
    }
    return(
        <main className="home-page">
            <HomePageNavBar links={links}></HomePageNavBar>
            <HomePageMaincontent links={links}></HomePageMaincontent>
        </main>
    )
}

export default HomePage;