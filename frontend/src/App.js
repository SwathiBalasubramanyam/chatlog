import React from "react";
import { Route, Switch } from "react-router-dom";
import SigninForm from "./components/UserForm/SigninForm";
import SignupForm from "./components/UserForm/SignupForm";
import HomePage from "./components/HomePage";
import WorkspacesPage from "./components/WorkspacesPage";
import Workspace from "./components/Workspace";
import Modal from "./components/Modal";
import "./reset.css";

const App = () => {
  return (
    <>
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