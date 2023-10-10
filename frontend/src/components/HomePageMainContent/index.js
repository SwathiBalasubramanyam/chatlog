import { Link } from "react-router-dom";

const HomePageMaincontent = () => {
    return (
        <section className="billboard">
            <div className="billboard-content">
                <div className="billboard-illustration">

                </div>
                <header className="billboard-header">
                    <h1 className="billboard-header-headline">
                        Made for people.
                        <span>
                            Built for productivity.
                        </span>
                    </h1>
                    <p className="billboard-header-copy">
                        Connect the right people, find anything you need and automate the rest. That&apos;s work in Slack, your productivity platform.
                    </p>
                    <div className="billboard-header-cta">
                        <Link to="/get-started">SIGN UP WITH EMAIL</Link>
                        <Link to="/demo-signin">DEMO USER</Link>
                    </div>
                    <p className="billboard">
                        <strong>Slack is free to try</strong> for as long as you'd like
                    </p>
                </header>
            </div>

        </section>
    )
}

export default HomePageMaincontent;