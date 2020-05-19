import React, { Component } from "react";

import { Job } from "../routes/upload/upload.js";
import { Home } from '../routes/home/home.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export const MainContainer = (props) => {

    return (
      <div>
        <Route path="/" exact render={() => <Home {...props} />} />
        <Route path="/upload" exact render={() => <Job {...props}/>} />
        <Route path='/job/:job_num' />
      </div>
    );
  }

