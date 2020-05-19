import React, { useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavBar } from "./components/navigation.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, verifyUser } from "./actions/actions.js";
import { Dimmer, Loader, Message, Segment } from "semantic-ui-react";
import { rootStore } from "./reducers/index";
import { AzureAD, LoginType, AuthenticationState } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { adalApiFetch } from "./adalConfig";


export const App = () => {
  const dispatch = useDispatch();
  const jobsLoaded = useSelector((state) => state.allJobsReducer.loaded);
  const jobs = useSelector((state) => state.allJobsReducer.data);
  const text = adalApiFetch();
  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  if (jobs) {
    return (
      <Router>
        <NavBar />
        <Route path="/" />
      </Router>
    );
  } else {
    return (
      <Dimmer active>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  }
};
