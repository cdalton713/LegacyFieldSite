import React, { useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavBar } from "./components/navigation.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, verifyUser } from "./actions/jobs_actions.js";
import { adalApiFetch } from "./adalConfig";
import { LoadingView } from "./components/common";

export const App = () => {
  const dispatch = useDispatch();
  const jobsLoaded = useSelector((state) => state.allJobs.loaded);
  const jobs = useSelector((state) => state.allJobs.data);
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
    return <LoadingView />;
  }
};
