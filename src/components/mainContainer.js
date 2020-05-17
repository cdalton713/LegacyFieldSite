import React, { Component } from "react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Container,
  Sidebar,
  Button,
  Grid,
  Segment,
} from "semantic-ui-react";
import FileUploader from "./fileUploader.js";
import FineUploaderTraditional from "fine-uploader-wrappers";
import { NumberInput } from "./inputs.js";

import { Upload } from "../routes/upload/upload.js";
import { Home } from '../routes/home/home.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class MainContainer extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/upload" exact component={Upload} />
      </div>
    );
  }
}
