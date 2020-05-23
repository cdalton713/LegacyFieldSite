import React, { Component } from "react";

import { Job } from "../routes/job/job.js";
import { Home } from "../routes/home/home.js";
import { SettingsPage } from "../routes/settings/settings.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export const MainContainer = (props) => {
  return (
    <div>
      <Route path="/" exact>
        <Home />
      </Route>
      {/*<Route path="/upload" exact render={() => <Job {...props}/>} />*/}
      <Route path={["/job"]}>
        <Job />
      </Route>
      <Route path={["/settings"]}>
        <SettingsPage />
      </Route>
    </div>
  );
};
