import HomePageNavBar from "../HomePageNavBar";
import HomePageMaincontent from "../HomePageMainContent";
import "./HomePage.css"

const HomePage = () => {
    return(
        <main className="home-page">
            <HomePageNavBar></HomePageNavBar>
            <HomePageMaincontent></HomePageMaincontent>
        </main>
    )
}

export default HomePage;