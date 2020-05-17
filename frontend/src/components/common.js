import React, { useState } from "react";
import { Button, Icon, Progress } from "semantic-ui-react";

export const StartUploadButton = (props) => {
  const { color = "blue", label = "Start Upload", ...restProps } = props;
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


