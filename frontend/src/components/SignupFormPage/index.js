import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import SlackLogo from "../../images/slack-logo.png";
import "./SignupForm.css";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        };
        
    return (
        <div className="signup-page">
            <div className="signup-page-header">
            <div className="left-col"></div>
            <div className="center-col">
                <Link className="center-col-link" to="/">
                    <img src={SlackLogo} style={{height: "25px", width: "25px"}}></img>
                    <h4>ChatLog</h4>
                </Link>
            </div>
            <div className="right-col"></div>
            </div>
            <div className="signup-form">
                <div className='signup-form-heading'>
                    <h2>First, enter your email</h2>
                </div>
                <div className='signup-form-sub-heading'>We suggest using the
                <strong> email address you use at work.</strong>
                <div className="signup-get-started">
                    <form className="signup-form-form" onSubmit={handleSubmit}>
                        <ul className={errors.length ? "errors" : "hidden"}>
                            {errors.map(error => <li className={errors.length ? "errors" : "hidden"} key={error}>{error}</li>)}
                        </ul>
                        <input type="text" placeholder="name@work-email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <button type="submit">Continue</button>
                    </form>
                </div>
            </div>
        </div>


        </div>
    );
}

export default SignupFormPage;