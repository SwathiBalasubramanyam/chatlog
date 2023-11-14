import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninForm from "./components/UserForm/SigninForm";
import SignupForm from "./components/UserForm/SignupForm";
import HomePage from "./components/HomePage";
import WorkspacesPage from "./components/WorkspacesPage";
import Workspace from "./components/Workspace";
import Modal from "./components/Modal";
import AddMemberForm from "./components/AddMemberForm";
import "./reset.css";
import ReactGA from 'react-ga';

const TRACKING_ID = "G-1XL1V2E1QJ";
ReactGA.initialize(TRACKING_ID);

const App = () => {
  ReactGA.pageview('test-init-pageview')
  return (
    <>
      <Modal></Modal>
      <Switch>
        <Route path="/addmembers">
          <AddMemberForm/>
        </Route>
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