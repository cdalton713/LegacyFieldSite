import React from "react";
import logo from "./logo.svg";
import { Container } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainNavBar from "./components/navigation.js";

export default function App() {
  return (
    <Router>
      <MainNavBar />
      <Route path='/' />
      
    </Router>
  );
}
