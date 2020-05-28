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
  // useEffect(() => {
  //   const id = props.rows[props.rows.length - 1];
  //   props.registerDynamicDropdownText(
  //     props.dropdownPrefix + "-" + id,
  //     props.textPrefix + "-" + id
  //   );
  // });

  const DropdownItem = (props) => {
    return (
      <Form.Dropdown
        key={props.id}
        id={props.id}
        name={props.id}
        value={props.value}
        options={props.options}
        label={props.label}
        // label={props.rows[0].id === props.id ? props.dropdownLabel : null}
        placeholder={props.placeholder}
        multiple={false}
        search={true}
        required
        selection={true}
        onChange={(e, { name, value }) => {
          // let newRows = [...props.rows];
          // let index = props.rows.findIndex((value) => value.id === props.id);
          // newRows[index].dropdownValue = value;
          // props.setRows(newRows);
          let items = [...props.rows];
          items[props.idx]["dropdownValue"] = value;
          props.handleChange(items);
          props.setValue(name, value);
          props.triggerValidation(name);
        }}
        error={!!props.errors[props.id]}
      />
    );
  };

  const TextItem = (props) => {
    return (
      <Form.Dropdown
        key={props.id}
        id={props.id}
        name={props.id}
        value={props.value}
        label={props.label}
        options={props.options}
        allowAdditions={true}
        search={true}
        selection={true}

        // label={props.rows[0].id === props.id ? props.textLabel : null}
        placeholder={props.placeholder}
        onAddItem={(e, {name, value}) => {
          let items = [...props.rows];
          items[props.idx]["textValue"] = value;

          props.setOptions({text: value, value}, ...props.options)
          props.handleChange(items);
          props.setValue(name, value);
          props.triggerValidation(name);
        }}
        onChange={(e, { name, value }) => {
          // let newRows = [...props.rows];
          // let index = props.rows.findIndex((value) => value.id === props.id);
          // newRows[index].textValue = value;
          // props.setRows(newRows);
          let items = [...props.rows];
          items[props.idx]["textValue"] = value;
          props.handleChange(items);
          props.setValue(name, value);
          props.triggerValidation(name);
        }}
        error={!!props.errors[props.id]}
      />
    );
  };

  return (
    <>
      {props.rows.map((row, idx) => {
        const dropdownID = props.dropdownPrefix + "-" + idx;
        const textID = props.textPrefix + "-" + idx;
        const groupID =
          props.dropdownPrefix + "-" + props.textPrefix + "-" + idx;
        return (
          <Form.Group key={groupID} id={groupID}>
            <DropdownItem
              id={dropdownID}
              idx={idx}
              name={dropdownID}
              value={props.rows[idx].dropdownValue}
              label={props.dropdownLabel}
              placeholder={props.dropdownPlaceholder}
              options={props.dropdownOptions}
              rows={props.rows}
              setValue={props.setValue}
              errors={props.errors}
              triggerValidation={props.triggerValidation}
              handleChange={props.handleChange}
            />
            <TextItem
              id={textID}
              idx={idx}
              name={textID}
              value={props.rows[idx].textValue}
              label={props.textLabel}
              placeholder={props.textPlaceholder}
              options={props.textOptions}
              rows={props.rows}
              setValue={props.setValue}
              setOptions={props.setOptions}
              errors={props.errors}
              triggerValidation={props.triggerValidation}
              handleChange={props.handleChange}
            />
          </Form.Group>
        );
      })}
    </>
  );
};
