import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import SlackLogo from "../../images/slack-logo.png";
import "./SignupForm.css";
import DemoButton from "../DemoButton";
import FormError from "../FormErrors";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let passwordErrors = [];
    let emailErrors = [];

    if (errors.length > 0 && typeof errors[0] !== "string") {
        passwordErrors = ["Invalid credentials"]
    } else {
        passwordErrors = errors.filter(error => error.includes("Password"));
        emailErrors = errors.filter(error => error.includes("Email"));
    }

    if (sessionUser) return <Redirect to="/signin/workspaces" />;

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
                        <div className="input-container">
                            <input type="text" placeholder="name@work-email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <ul>{emailErrors.map((emailError) => (<FormError error={emailError} />))}</ul>
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <ul>{passwordErrors.map((passwordError) => (<FormError error={passwordError} />))}</ul>
                        </div>
                        <button type="submit">Continue</button>
                    </form>
                    <div className="signup-or">OR</div>
                    <div className="signup-demo-btn">
                        <DemoButton></DemoButton>
                    </div>
                </div>
            </div>
        </div>


        </div>
    );
}

export default SignupFormPage;