import React, { useEffect, useState } from "react";
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
  Form,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { dark } from "@material-ui/core/styles/createPalette";
import { optionBHAComponents } from "../routes/incident/options";

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

export const DynamicDropdownText = (props) => {
  const children = [];
  const [internalValues, setInternalValues] = useState([{ id: 1, value: "" }]);

  // useEffect(() => {
  //   const id = props.rows[props.rows.length - 1];
  //   props.registerDynamicDropdownText(
  //     props.dropdownPrefix + "-" + id,
  //     props.textPrefix + "-" + id
  //   );
  // });

  const DropdownItem = (props) => {
    const dropdownKey = props.dropdownPrefix + "-" + props.id;
    return (
      <Form.Dropdown
        key={dropdownKey}
        options={props.options}
        name={dropdownKey}
        label={props.rows[0] === props.id ? props.dropdownLabel : null}
        placeholder={props.dropdownPlaceholder}
        multiple={false}
        search={true}
        required
        selection={true}
        value={props.value}
        onBlur={async (e, { name, value }) => {
          let newRows = [...props.rows];
          let index = props.rows.findIndex((value) => value.id === props.id);
          newRows[index].dropdownValue = value;
          props.setRows(newRows);
          props.setValue(name, value);
          await props.triggerValidation(name);
        }}
        error={!!props.errors[props.dropdownPrefix + "-" + props.id]}
      />
    );
  };

  const TextItem = (props) => {
    const textKey = props.textPrefix + "-" + props.id;
    return (
      <Form.Input
        key={textKey}
        name={textKey}
        value={props.value}
        label={props.rows[0] === props.id ? props.textLabel : null}
        onBlur={async (e, { name, value }) => {
          let newRows = [...props.rows];
          let index = props.rows.findIndex((value) => value.id === props.id);
          newRows[index].textValue = value;
          props.setRows(newRows);
          props.setValue(name, value);
          await props.triggerValidation(name);
        }}
        error={!!props.errors[props.textPrefix + "-" + props.id]}
      />
    );
  };

  props.rows.forEach((row) => {
    children.push(
      <Form.Group>
        <DropdownItem
          id={row.id}
          value={row.dropdownValue}
          rows={props.rows}
          dropdownPlaceholder={props.dropdownPlaceholder}
          dropdownPrefix={props.dropdownPrefix}
          dropdownLabel={props.dropdownLabel}
          errors={props.errors}
          options={props.options}
          setValue={props.setValue}
          triggerValidation={props.triggerValidation}
          setRows={props.setRows}
        />
        <TextItem
          id={row.id}
          value={row.textValue}
          rows={props.rows}
          textPrefix={props.textPrefix}
          textLabel={props.textLabel}
          errors={props.errors}
          setValue={props.setValue}
          triggerValidation={props.triggerValidation}
          setRows={props.setRows}
        />
      </Form.Group>
    );
  });

  return (
    <>
      {children}
      <Form.Button
        onClick={(e) => {
          props.handleNewRow({
            id: props.rows[props.rows.length - 1] + 1,
            dropdownValue: "",
            textValue: "",
          });
        }}
      >
        Add Another
      </Form.Button>
    </>
  );
};
