import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import SigninWorkspaces from "./components/SigninWorkspaces";
import "./reset.css";

const App = () => {
  return (
    <Switch>
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
  )
}

export default App;