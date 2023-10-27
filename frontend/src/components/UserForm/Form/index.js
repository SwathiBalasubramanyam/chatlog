import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import FormError from "../FormError";
import ChatLogLogo from "../../ChatLogLogo";
import * as modalActions from "../../../store/modal";
import "./Form.css";

function Form({thunkAction, rightCol=false, pageHeaderText, ctaText}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let passwordErrors = [];
    let emailErrors = [];

    if (errors.length == 1 && typeof errors[0] === "string") {
        emailErrors = errors
    } else {
        passwordErrors = errors.filter(error => error.includes("Password"));
        emailErrors = errors.filter(error => error.includes("Email"));
    }

    if (sessionUser) return <Redirect to="/signin/workspaces" />;

    const handleSubmit = (e) => {
        console.log("is this the form ??")
        e.preventDefault();
        setErrors([]);
        return dispatch(thunkAction(email, password))
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
        <div className="user-form-page">
            <div className="user-form-header">
                <div className="left-col"></div>
                <div className="center-col">
                    <Link className="center-col-link" to="/"><ChatLogLogo/></Link>
                </div>
                <div className="right-col">
                    {rightCol && 
                        <div>
                            <div className="sidelink">New to ChatLog? </div>
                            <Link to="/get-started">Create an account</Link>
                        </div>
                    }
                </div>
            </div>
            <div className="user-form">
                <div className="user-form-form-header">
                    <h2>{pageHeaderText}</h2>
                    <div className='user-form-sub-heading'>We suggest using the <strong> email address you use at work.</strong></div>
                </div>
                <form className="user-input-form" onSubmit={handleSubmit}>
                    <div className="user-input-container">
                        <input type="text" placeholder="name@work-email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <ul>{emailErrors.map((emailError) => (<FormError error={emailError} />))}</ul>
                    </div>
                    <div className="user-input-container">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <ul>{passwordErrors.map((passwordError) => (<FormError error={passwordError} />))}</ul>
                    </div>
                    <button type="submit">{ctaText}</button>
                </form>
                <div className="form-footer">
                    <div className="form-or">OR</div>
                    <div className="form-demo-btn">
                        <button className="try-demo-btn" onClick={() => dispatch(modalActions.openModal("demo"))}>TRY A DEMO</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;