import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninForm from "./components/UserForm/SigninForm";
import SignupForm from "./components/UserForm/SignupForm";
import HomePage from "./components/HomePage";
import WorkspacesPage from "./components/WorkspacesPage";
import Workspace from "./components/Workspace";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session"
import Modal from "./components/Modal";
import "./reset.css";

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
          <WorkspacesPage/>
        </Route>
        <Route path="/signin">
          <SigninForm/>
        </Route>
        <Route path="/get-started">
          <SignupForm/>
        </Route>
        <Route >
          <HomePage/>
        </Route>
      </Switch>
    </>
  )
}

export default App;