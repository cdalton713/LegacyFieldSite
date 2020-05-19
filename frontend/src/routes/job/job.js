import React, { useState, useCallback } from "react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Container,
  Sidebar,
  Button,
  Grid,
  Card,
  Divider,
  Segment,
} from "semantic-ui-react";
import FileUploader from "../../components/fileUploader";
import FineUploaderAzure from "fine-uploader-wrappers/azure";
import { NumberInput, DropdownSelection } from "../../components/inputs.js";
import { MyDataTable } from "../../components/datatable.js";
import { Select } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {CurrentJobCard} from "../../components/common";

