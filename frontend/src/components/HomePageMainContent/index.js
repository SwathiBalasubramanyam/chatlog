import { Link } from "react-router-dom";
import TeamDiscussingVideo from "../../videos/team-discussing-work.mp4";
import UsingWorkdayVideo from "../../videos/using-workday-integration.webm";
import UserStartingHuddleVideo from "../../videos/user-starting-huddle.webm";
import TeamTogetherVideo from "../../videos/team-together.webm";
import SlackLogo from "../../images/slack-logo.png"
import AirbnbLogo from "../../images/airbnb-logo.png";
import NasaLogo from "../../images/logo-nasa.png";
import UberLogo from "../../images/uber.png";
import TargetLogo from "../../images/target-logo.png";
import NytLogo from "../../images/nyt.png";
import EtsyLogo from "../../images/logo-etsy.png";
import "./HomePageMainContent.css";
import DemoButton from "../DemoButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const HomePageMaincontent = () => {
    
    return (
        <main className="home-page-main">
            <section className="billboard">
                <div className="billboard-content">
                    <header className="billboard-header">
                        <h1>Made for people.</h1>
                        <h1> Built for productivity.</h1>
                        <p className="billboard-header-copy">
                            Connect the right people, find anything you need and automate the rest. That&apos;s work in ChatLog, your productivity platform.
                        </p>
                        <div className="billboard-header-cta">
                            <Link to="/get-started">SIGN UP HERE</Link>
                            <DemoButton></DemoButton>
                        </div>
                        <p className="billboard-header-copy">
                            <strong>ChatLog is free to try</strong> for as long as you'd like
                        </p>
                    </header>
                    <div className="billboard-illustration">
                        <video src={TeamDiscussingVideo} autoPlay loop muted ></video>
                    </div>
                </div>
            </section>
            <section className="company-section">
                <p className="company-section-title">Trusted by companies all over the world</p>
                <div className="company-logo-container">
                    <img src={AirbnbLogo}></img>
                    <img src={NasaLogo}></img>
                    <img src={UberLogo}></img>
                    <img src={TargetLogo}></img>
                    <img src={NytLogo}></img>
                    <img src={EtsyLogo}></img>
                </div>
            </section>
            <section className="workday-integration">
                <div className="using-workday-illustration">
                    <video src={UsingWorkdayVideo} autoPlay loop muted ></video>
                </div>
                <div className="section-copy">
                    <h2>Move faster with your tools in one place</h2>
                    <p>Automate away routine tasks with the power of generative AI and simplify your workflow with all your favorite apps ready to go in ChatLog.</p>
                </div>
            </section>
            <section className="how-you-want-to-work">
                <div className="section-copy">
                    <h2>Choose how you want to work</h2>
                    <p>In ChatLog, you&apos;ve got all the flexibility to work when, where and how it&apos;s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
                </div>
                <div className="huddle-illustration">
                    <video src={UserStartingHuddleVideo} autoPlay loop muted ></video>
                </div>
            </section>

            <section className="team-together">
                <div className="team-together-illustration">
                    <video src={TeamTogetherVideo} autoPlay loop muted ></video>
                </div>
                <div className="section-copy">
                    <h2>Bring your team together</h2>
                    <p>At the heart of ChatLog are channels: organized spaces for everyone and everything you need for work. In channels, it&apos;s easier to connect across departments, offices, time zones and even other companies.</p>
                </div>
            </section>
            <section className="accomplish-with-slack">
                <h3>See all you can accomplish with ChatLog</h3>
                <div className="billboard-header-cta">
                    <Link to="/get-started">SIGN UP HERE</Link>
                    <DemoButton></DemoButton>
                </div>
            </section>
            <section className="home-page-footer">
                <img src={SlackLogo}></img>
            </section>
        </main>

    )
}

export default HomePageMaincontent;