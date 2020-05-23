import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Dropzone from "react-fine-uploader/dropzone";

import {
  Segment,
  Button,
  Header,
  List,
  Grid,
  Icon,
  Table,
  Checkbox,
  Progress,
  Dropdown,
  Popup,
} from "semantic-ui-react";

import Filename from "react-fine-uploader/filename";
import Filesize from "react-fine-uploader/filesize";
import Thumbnail from "react-fine-uploader/thumbnail";
import CancelButton from "react-fine-uploader/cancel-button";
import FileInput from "react-fine-uploader/file-input";
import RetryButton from "react-fine-uploader/retry-button";
import PauseResumeButton from "react-fine-uploader/pause-resume-button";

import { StartUploadButton, SelectFilesButton, IconMessage } from "./common.js";

const tempDropdownOptions = [
  { key: "af", value: "Afghanistan", flag: "af", text: "Afghanistan" },
  { key: "ax", value: "Aland Islands", flag: "ax", text: "Aland Islands" },
  { key: "al", value: "Albania", flag: "al", text: "Albania" },
  { key: "dz", value: "Algeria", flag: "dz", text: "Algeria" },
  { key: "as", value: "American Samoa", flag: "as", text: "American Samoa" },
  { key: "ad", value: "Andorra", flag: "ad", text: "Andorra" },
  { key: "ao", value: "Angola", flag: "ao", text: "Angola" },
  { key: "ai", value: "Anguilla", flag: "ai", text: "Anguilla" },
  { key: "ag", value: "Antigua", flag: "ag", text: "Antigua" },
  { key: "ar", value: "Argentina", flag: "ar", text: "Argentina" },
];

export default class FileUploader extends Component {
  static propTypes = {
    className: PropTypes.string,
    uploader: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: "",
    "cancelButton-children": <Icon name="cancel" />,
    "deleteButton-children": <Icon name="cancel" />,
    "dropzone-disabled": false,
    "dropzone-dropActiveClassName":
      "react-fine-uploader-gallery-dropzone-active",
    "dropzone-multiple": true,
    "fileInput-multiple": true,
    "pauseResumeButton-pauseChildren": <Icon name="pause" />,
    "pauseResumeButton-resumeChildren": <Icon name="play" />,
    "retryButton-children": <Icon name="play" />,
    "thumbnail-maxSize": 20,
  };

  constructor(props) {
    super(props);

    this.state = {
      visibleFiles: [],
    };

    const statusEnum = props.uploader.qq.status;

    this._onStatusChange = (id, oldStatus, status) => {
      const visibleFiles = this.state.visibleFiles;

      if (status === statusEnum.SUBMITTED) {
        visibleFiles.push({ id });
        this.setState({ visibleFiles });
      } else if (isFileGone(status, statusEnum)) {
        this._removeVisibleFile(id);
      } else if (
        status === statusEnum.UPLOAD_SUCCESSFUL ||
        status === statusEnum.UPLOAD_FAILED
      ) {
        if (status === statusEnum.UPLOAD_SUCCESSFUL) {
          const visibleFileIndex = this._findFileIndex(id);
          if (visibleFileIndex < 0) {
            visibleFiles.push({ id, fromServer: true });
          }
        }
        this._updateVisibleFileStatus(id, status);
      }
    };

    this._onUpload = (id, name) => {
      this.state.visibleFiles.some((file) => {
        if (file.id === id) {
          file.file_name = name;
          file.dd_mwd = this.props.ddMwd;
          file.mwd_run = this.props.mwdRun;
          file.dd_run = this.props.ddRun;
          this.setState({ visibleFiles: this.state.visibleFiles });
        }
      });
    };

    this._onSubmitted = (id, name) => {
      this.state.visibleFiles.some((file) => {
        if (file.id === id) {
          file.item_group = "UNKNOWN";
          this.setState({ visibleFiles: this.state.visibleFiles });
        }
      });
    };

    this.handleItemGroupChange = this.handleItemGroupChange.bind(this);
    this.handleBulkItemGroupChange = this.handleBulkItemGroupChange.bind(this);
    this.handleItemSelectionChange = this.handleItemSelectionChange.bind(this);
  }

  componentDidMount() {
    this.props.uploader.on("onStatusChange", this._onStatusChange);
    this.props.uploader.on("onUpload", this._onSubmitted);
  }

  componentWillUnmount() {
    this.props.uploader.off("onStatusChange", this._onStatusChange);
  }

  handleItemGroupChange(id, value) {
    this.state.visibleFiles.some((file) => {
      if (file.id === id) {
        file.item_group = value;
        this.setState({ visibleFiles: this.state.visibleFiles });
      }
    });
  }

  handleItemSelectionChange(id, value) {
    this.state.visibleFiles.some((file) => {
      if (file.id === id) {
        file.selected = value;
        this.setState({ visibleFiles: this.state.visibleFiles });
      }
    });
  }

  handleBulkItemGroupChange(value) {
    const visibleFiles = this.state.visibleFiles;

    visibleFiles.forEach((file) => {
      if (file.selected === true) {
        file.item_group = value;
      }
    });
    this.setState({ visibleFiles: visibleFiles });
  }

  render() {
    const cancelButtonProps = getComponentProps("cancelButton", this.props);
    const dropzoneProps = getComponentProps("dropzone", this.props);
    const fileInputProps = getComponentProps("fileInput", this.props);
    const filenameProps = getComponentProps("filename", this.props);
    const filesizeProps = getComponentProps("filesize", this.props);
    const progressBarProps = getComponentProps("progressBar", this.props);
    const retryButtonProps = getComponentProps("retryButton", this.props);
    const statusProps = getComponentProps("status", this.props);
    const thumbnailProps = getComponentProps("thumbnail", this.props);
    const uploader = this.props.uploader;

    const chunkingEnabled =
      uploader.options.chunking && uploader.options.chunking.enabled;
    const deleteEnabled =
      uploader.options.deleteFile && uploader.options.deleteFile.enabled;
    const deleteButtonProps =
      deleteEnabled && getComponentProps("deleteButton", this.props);
    const pauseResumeButtonProps =
      chunkingEnabled && getComponentProps("pauseResumeButton", this.props);

    return (
      <div align="center">
        {JSON.stringify(this.state.visibleFiles)}
        <MaybeDropzone
          children={defaultDropZoneMessage(dropzoneProps.disabled)}
          content={this.props.children}
          hasVisibleFiles={this.state.visibleFiles.length > 0}
          uploader={uploader}
          {...dropzoneProps}
        >
          {!fileInputProps.disabled && (
            <FileInputComponent uploader={uploader} {...fileInputProps} />
          )}
        </MaybeDropzone>
        <br />
        <Popup
          content={
            <IconMessage message="Select DD, MWD Run, DD Run, and file-type groups first." />
          }
          disabled={false}
          trigger={
            <span>
              <StartUploadButton disabled={false}  />
            </span>
          }
          position="top center"
        />
        <PendingFiles
          content={this.props.children}
          hasVisibleFiles={this.state.visibleFiles.length > 0}
          visibleFiles={this.state.visibleFiles}
          uploader={uploader}
          dropzoneP={dropzoneProps}
          cancelButtonP={cancelButtonProps}
          retryButtonP={retryButtonProps}
          pauseResumeP={pauseResumeButtonProps}
          filenameP={filenameProps}
          filesizeP={filesizeProps}
          chunkingEnabled={chunkingEnabled}
          handleItemGroupChange={this.handleItemGroupChange}
          handleBulkItemGroupChange={this.handleBulkItemGroupChange}
          handleItemSelectionChange={this.handleItemSelectionChange}
          ddMwd={this.props.ddMwd}
          mwdRun={this.props.mwdRun}
          ddRun={this.props.ddRun}
        ></PendingFiles>
      </div>
    );
  }

  _removeVisibleFile(id) {
    const visibleFileIndex = this._findFileIndex(id);

    if (visibleFileIndex >= 0) {
      const visibleFiles = this.state.visibleFiles;

      visibleFiles.splice(visibleFileIndex, 1);
      this.setState({ visibleFiles });
    }
  }

  _updateVisibleFileStatus(id, status) {
    this.state.visibleFiles.some((file) => {
      if (file.id === id) {
        file.status = status;
        this.setState({ visibleFiles: this.state.visibleFiles });
        return true;
      }
    });
  }

  _findFileIndex(id) {
    let visibleFileIndex = -1;

    this.state.visibleFiles.some((file, index) => {
      if (file.id === id) {
        visibleFileIndex = index;
        return true;
      }
    });

    return visibleFileIndex;
  }
}

const FileInputComponent = ({ uploader, ...props }) => {
  const { children, ...fileInputProps } = props;
  const content = children || (
    <span>
      <br />
      <SelectFilesButton />
    </span>
  );

  return (
    <FileInput
      className="react-fine-uploader-gallery-file-input-container"
      uploader={uploader}
      {...fileInputProps}
    >
      <span className="react-fine-uploader-gallery-file-input-content">
        {content}
      </span>
    </FileInput>
  );
};

const MaybeDropzone = ({
  children,
  content,
  hasVisibleFiles,
  uploader,
  ...props
}) => {
  const { disabled, ...dropzoneProps } = props;

  let dropzoneDisabled = disabled;
  if (!dropzoneDisabled) {
    dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop;
  }

  if (hasVisibleFiles) {
    content =
      content ||
      getDefaultMaybeDropzoneContent({ content, disabled: dropzoneDisabled });
  }

  if (dropzoneDisabled) {
    return (
      <div className="react-fine-uploader-gallery-nodrop-container">
        {content}
        {children}
      </div>
    );
  }

  return (
    <Dropzone uploader={uploader} {...dropzoneProps}>
      <Segment
        placeholder
        className="react-fine-uploader-gallery-dropzone-content"
      >
        {defaultDropZoneMessage(dropzoneProps.disabled)}
        {children}
      </Segment>
    </Dropzone>
  );
};

const PendingFiles = ({
  children,
  content,
  hasVisibleFiles,
  visibleFiles,
  uploader,
  dropzoneP,
  cancelButtonP,
  retryButtonP,
  pauseResumeP,
  filenameP,
  filesizeP,
  chunkingEnabled,
  handleItemGroupChange,
  handleBulkItemGroupChange,
  handleItemSelectionChange,
  ddMwd,
  mwdRun,
  ddRun,
  ...props
}) => {
  if (visibleFiles.length > 0) {
    return (
      <div className="container-small-top-bottom-padding">
        <br />
        <Grid columns={2} className="compact" verticalAlign="middle">
          <Grid.Column textAlign="left">
            <span>
              Mark selected files as...{" "}
              <Dropdown
                inline
                options={tempDropdownOptions}
                defaultValue={tempDropdownOptions[0].value}
                onChange={(e) => {
                  handleBulkItemGroupChange(e.target.textContent);
                }}
              />
            </span>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Progress
              indicating
              percent={50}
              size="small"
              className="no-margin"
            />
          </Grid.Column>
        </Grid>
        <Table
          color={
            ddMwd !== "" && mwdRun !== "" && ddRun !== "" ? "green" : "red"
          }
          compact
          className="no-margin"
        >
          <Table.Body>
            {visibleFiles.map(({ id, status, fromServer }) => (
              <Table.Row key={id}>
                <Table.Cell collapsing verticalAlign="middle">
                  <Checkbox
                    id={id}
                    onChange={(e) => {
                      handleItemSelectionChange(id, e.target.checked);
                    }}
                  />
                </Table.Cell>
                <Table.Cell verticalAlign="middle">
                  <Grid compact columns={2}>
                    <Grid.Column width={15}>
                      <List size="small" className="no-margin">
                        <List.Item>
                          <List.Icon
                            id={id}
                            size="small"
                            verticalAlign="middle"
                          >
                            <Thumbnail
                              id={id}
                              uploader={uploader}
                              maxSize={25}
                            />
                          </List.Icon>
                          <List.Content>
                            <List.Header>
                              <Filename
                                id={id}
                                uploader={uploader}
                                {...filenameP}
                              />
                            </List.Header>
                            <List.Description>
                              <Filesize
                                id={id}
                                uploader={uploader}
                                {...filesizeP}
                              />
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                    <Grid.Column width={1} stretched verticalAlign="middle">
                      {/* TEMP ICONS FOR LAYOUT */}
                      <Button.Group size="mini">
                        <Icon name="redo" size="small" />
                        <RetryButton
                          className="ui mini icon button retry-upload"
                          id={id}
                          onlyRenderIfRetryable={false}
                          children={<span>TEST</span>}
                          uploader={uploader}
                          {...retryButtonP}
                        />
                      </Button.Group>
                      {/* <List.Icon size="small" verticalAlign="middle">
                        <RetryButton id={id} uploader={uploader} {...retryButtonP} />
                      </List.Icon> */}
                      {/* {chunkingEnabled && (
                        <span key={id}>
                          <PauseResumeButton
                            className="ui mini icon button"
                            id={id}
                            resumeChildren={'TEST'}
                            uploader={uploader}
                            {...pauseResumeP}
                          />
                        </span>
                      )} */}
                    </Grid.Column>
                  </Grid>
                  <Progress
                    percent={75}
                    size="tiny"
                    indicating
                    className="no-margin"
                  />
                </Table.Cell>

                <Table.Cell verticalAlign="middle" width={3}>
                  <Dropdown
                    placeholder="Select File Type"
                    fluid
                    search
                    selection
                    options={tempDropdownOptions}
                    value={visibleFiles[id].item_group || 'UNKNOWN'}
                    onChange={(e) => {
                      handleItemGroupChange(id, e.target.textContent);
                    }}
                  />
                </Table.Cell>
                <Table.Cell collapsing verticalAlign="middle">
                  <CancelButton
                    className="ui mini icon button"
                    id={id}
                    uploader={uploader}
                    {...cancelButtonP}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  } else {
    return <span />;
  }
};

const getComponentProps = (componentName, allProps) => {
  const componentProps = {};

  Object.keys(allProps).forEach((propName) => {
    if (propName.indexOf(componentName + "-") === 0) {
      const componentPropName = propName.substr(componentName.length + 1);
      componentProps[componentPropName] = allProps[propName];
    }
  });

  return componentProps;
};

const defaultDropZoneMessage = (disabled) => {
  const className = disabled
    ? "react-fine-uploader-gallery-nodrop-content"
    : "react-fine-uploader-gallery-dropzone-content";

  return (
    <span className={className}>
      <Header size="large">Drop Files Here</Header>
    </span>
  );
};
const getDefaultMaybeDropzoneContent = ({ content, disabled }) => {
  const className = disabled
    ? "react-fine-uploader-gallery-nodrop-content"
    : "react-fine-uploader-gallery-dropzone-content";

  if (disabled && !content) {
    return <span className={className}>Upload files</span>;
  } else if (content) {
    return <span className={className}>{content}</span>;
  } else if (!disabled) {
    return defaultDropZoneMessage(disabled);
  }
};

const isFileGone = (statusToCheck, statusEnum) => {
  return [statusEnum.CANCELED, statusEnum.DELETED].indexOf(statusToCheck) >= 0;
};
