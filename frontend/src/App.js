import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import SigninWorkspaces from "./components/SigninWorkspaces";
import Workspace from "./components/Workspace";
import "./reset.css";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session"
import Modal from "./components/Modal";

const App = () => {
  const sessionUser = useSelector(state => state.session.currentUser)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(sessionActions.logout())
  }

  return (
    <>
      {sessionUser && <button onClick={handleLogout}>Click here to logout from chatlog</button>}
      <Modal></Modal>
      <Switch>
        <Route path="/workspace/:workspaceId">
          <Workspace/>
        </Route>
        <Route path="/signin/workspaces">
          <SigninWorkspaces/>
        </Route>
        <Route path="/signin">
          <LoginFormPage/>
        </Route>
        <Route path="/get-started">
          <SignupFormPage/>
        </Route>
        <Route >
          <HomePage/>
        </Route>
      </Switch>
    </>
  )
}

export default App;