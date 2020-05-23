import React, { useState } from "react";
import {
  Button,
  Card,
  Dimmer,
  Icon,
  Grid,
  Segment,
  Loader,
  Header,
  Progress,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { dark } from "@material-ui/core/styles/createPalette";

export const StartUploadButton = (props) => {
  const { color = "blue", label = "Start Upload", ...restProps } = props;
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <Button color={color} {...restProps} inverted={darkMode}>
      {label}
    </Button>
  );
};
export const SelectFilesButton = (props) => {
  const {
    color = "green",
    label = "Select Files",
    basic = true,
    ...restProps
  } = props;
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <Button basic={basic} color={color} {...restProps} inverted={darkMode}>
      {label}
    </Button>
  );
};

export const DeleteButton = (props) => {
  const { color = "red", label = "Delete All", ...restProps } = props;
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <Button color={color} {...restProps} inverted={darkMode}>
      {label}
    </Button>
  );
};

export const DownloadButton = (props) => {
  const { color = "blue", label = "Download All", ...restProps } = props;
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <Button color={color} {...restProps} inverted={darkMode}>
      {label}
    </Button>
  );
};

export const IconMessage = (props) => {
  const {
    color = "orange",
    name = "warning sign",
    message = "!! MISSING !!",
    ...restProps
  } = props;
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <span>
      <Icon name={name} color={color} {...restProps} inverted={darkMode} />
      {message}
    </span>
  );
};

export const CurrentJobCard = (props) => {
  const selectedJob = useSelector((state) => state.selectedJob.data);
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  if (selectedJob == null) {
    return (
      <Grid columns={3}>
        <Grid.Column>
          <Header as={"h4"} inverted={darkMode} attached={"top"}>
            Job Not Selected
          </Header>
          <Segment color={"red"} inverted={darkMode} attached={true}>
            Please select a job to continue
          </Segment>
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Grid columns={3}>
        <Grid.Column>
          <Header as={"h4"} inverted={darkMode} attached={"top"}>
            {selectedJob.well.well_name}
          </Header>
          <Segment inverted={darkMode} attached={true}>
            {selectedJob.job_id} <br /> {selectedJob.operator} <br />{" "}
            {selectedJob.rig}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
};

export const LoadingView = () => {
  return (
    <Dimmer active>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
};
