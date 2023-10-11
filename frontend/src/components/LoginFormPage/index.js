import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./LoginForm.css";
import SlackLogo from "../../images/slack-logo.png";
import { Link } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login(email, password ))
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
    }

  return (
    <div className="signin-page">
      <div className='signin-page-header'>
        <div className="left-col"></div>
        <div className="center-col">
          <Link className="center-col-link" to="/">
            <img src={SlackLogo} style={{height: "25px", width: "25px"}}></img>
            <h4>ChatLog</h4>
          </Link>
        </div>
        <div className="right-col">
          <div className="sidelink">New to ChatLog?
          </div>
          <Link to="/get-started">Create an account</Link>
        </div>
      </div>
      <div className="signin-form">
        <div className='signin-form-heading'>
          <h2>Sign in to ChatLog</h2>
        </div>
        <div className='signin-form-sub-heading'>We suggest using the
          <strong> email address you use at work.</strong>
        </div>
        <div className='signin-get-started'>
          <form className='signin-form-form' onSubmit={handleSubmit}>
            <ul className={errors.length ? "errors": "hidden"}>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input type="text" placeholder="name@work-email.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Sign In With Email</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
