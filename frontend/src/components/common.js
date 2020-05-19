import React, { useState } from "react";
import { Button, Card, Icon, Progress } from "semantic-ui-react";
import { useSelector } from "react-redux";

export const StartUploadButton = (props) => {
  const { color = "blue", label = "Start Job", ...restProps } = props;
  return (
    <Button color={color} {...restProps}>
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
  return (
    <Button basic={basic} color={color} {...restProps}>
      {label}
    </Button>
  );
};

export const DeleteButton = (props) => {
  const { color = "red", label = "Delete All", ...restProps } = props;
  return (
    <Button color={color} {...restProps}>
      {label}
    </Button>
  );
};

export const DownloadButton = (props) => {
  const { color = "blue", label = "Download All", ...restProps } = props;
  return (
    <Button color={color} {...restProps}>
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
  return (
    <span>
      <Icon name={name} color={color} {...restProps} />
      {message}
    </span>
  );
};

export const CurrentJobCard = (props) => {
  const selectedJob = useSelector((state) => state.selectedJobReducer.data);
  if (selectedJob == null) {
    return (
      <Card color={'red'} >
        <Card.Content header={'Job Not Selected'} />
        <Card.Content>
          {'Please select a job to continue'}
        </Card.Content>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Content header={selectedJob.well.well_name} />
        <Card.Content>
          {selectedJob.job_id} <br /> {selectedJob.operator} <br />{" "}
          {selectedJob.rig}
        </Card.Content>
      </Card>
    );
  }
};
