import Section from "../Section";
import TeamDiscussingVideo from "../../../videos/team-discussing-work.mp4";
import UsingWorkdayVideo from "../../../videos/using-workday-integration.webm";
import UserStartingHuddleVideo from "../../../videos/user-starting-huddle.webm";
import TeamTogetherVideo from "../../../videos/team-together.webm";
import AirbnbLogo from "../../../images/airbnb-logo.png";
import NasaLogo from "../../../images/logo-nasa.png";
import UberLogo from "../../../images/uber.png";
import TargetLogo from "../../../images/target-logo.png";
import NytLogo from "../../../images/nyt.png";
import EtsyLogo from "../../../images/logo-etsy.png";
import {Link} from "react-router-dom";
import './MainContent.css';
import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/modal"

const SectionOne = () => {
    const dispatch = useDispatch();

    return (
        <section className="other-section purple">
            <div className="section-copy">
                <h1 className="section-header">Made for people.</h1>
                <h1 className="section-header"> Built for productivity.</h1>
                <p className="section-body">
                    Connect the right people, find anything you need and automate the rest. That&apos;s work in ChatLog, your productivity platform.
                </p>
                <div className="section-cta">
                    <Link to="/get-started">SIGN UP HERE</Link>
                    <button className="try-demo-btn" onClick={() => dispatch(modalActions.openModal("demo"))}>TRY A DEMO</button>
                </div>
                <p className="section-cta-copy">
                    <strong>ChatLog is free to try</strong> for as long as you'd like
                </p>
            </div>
            <div className="section-illustration">
                <video src={TeamDiscussingVideo} autoPlay loop muted ></video>
            </div>
        </section>
    )
}

const SectionTwo = () => {
    return (
        <section className="other-section horchata">
            <p className="section-title"><strong>Trusted by companies all over the world</strong></p>
            <div className="section-img-container">
                <img src={AirbnbLogo}></img>
                <img src={NasaLogo}></img>
                <img src={UberLogo}></img>
                <img src={TargetLogo}></img>
                <img src={NytLogo}></img>
                <img src={EtsyLogo}></img>
            </div>
        </section>
    )
}

const SectionThree = () => {
    const secHeaders = ["Move faster with your tools in one place"];
    const secBody = "Automate away routine tasks with the power of generative AI and simplify your workflow with all your favorite apps ready to go in ChatLog."

    return (
        <Section sectionName="other-section" 
            srcPath={UsingWorkdayVideo} 
            sectionHeaders={secHeaders}
            sectionBody={secBody} videoFirst={true}
            background="horchata"
        />
    )
}

const SectionFour = () => {
    const secHeaders = ["Choose how you want to work"];
    const secBody = "In ChatLog, you've got all the flexibility to work when, where and how it's best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live."

    return (
        <Section sectionName="other-section" 
            srcPath={UserStartingHuddleVideo} 
            sectionHeaders={secHeaders}
            sectionBody={secBody}
            background="horchata"
        />
    )
}

const SectionFive = () => {
    const secHeaders = ["Bring your team together"];
    const secBody = "At the heart of ChatLog are channels: organized spaces for everyone and everything you need for work. In channels, it&apos;s easier to connect across departments, offices, time zones and even other companies."

    return (
        <Section sectionName="other-section" 
            srcPath={TeamTogetherVideo} 
            sectionHeaders={secHeaders}
            sectionBody={secBody} videoFirst={true}
            background="horchata"
        />
    )
}

const SectionSix = () => {
    const dispatch = useDispatch();
    return (
        <section className="other-section purple">
            <h3 className="section-header">See all you can accomplish with ChatLog</h3>
            <div className="section-cta">
                <Link to="/get-started">SIGN UP HERE</Link>
                <button className="try-demo-btn" onClick={() => dispatch(modalActions.openModal("demo"))}>TRY A DEMO</button>
            </div>
        </section>
    )
}

const MainContent = () => {
    return (
        <main className="home-page-main">
            <SectionOne/>
            <SectionTwo/>
            <SectionThree/>
            <SectionFour/>
            <SectionFive/>
            <SectionSix/>
        </main>
    )
}

export default MainContent;