import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as workspaceActions from "./store/workspaces";
import * as messageActions from "./store/messages";
import * as channelMemberActions from "./store/channelMembers";
import csrfFetch from "./store/csrf";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch =csrfFetch;
  window.sessionActions = sessionActions;
  window.workspaceActions = workspaceActions;
  window.messageActions = messageActions;
  window.channelMemberActions = channelMemberActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}