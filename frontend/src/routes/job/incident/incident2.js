import React, { useEffect, useState } from "react";
import { Form, Button, Header, Segment, Label } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  optionsIncidentGeneral,
  optionsIncidentInvolving,
  optionsIncidentOccurred,
  optionsWellSection,
  optionBHAComponents,
  tempUserOption,
} from "../../incident/options";
import { DevTool } from "react-hook-form-devtools";
import { DynamicDropdownText } from "../../../components/common";

const validation_schema = yup.object().shape({
  personnel_mwd: yup
    .array(yup.string())
    .compact()
    .required("MWD Personnel cannot be empty."),
  personnel_dd: yup
    .array(yup.string())
    .compact()
    .required("DD Personnel cannot be empty."),
  incident_date: yup.date().required("Date cannot be empty."),
  well_section: yup.string().required("Well Section cannot be empty."),
  estimated_downtime: yup
    .number()
    .positive()
    .required("Estimated Downtime cannot be empty."),
  incident_involving: yup
    .array(yup.string())
    .required("Incident Involving cannot be empty."),
  incident_occurred: yup
    .array(yup.string())
    .required("Incident Occurred cannot be empty."),
  incident_general: yup
    .array(yup.string())
    .required("Incident cannot be empty."),
  run_number: yup.number().integer().required("Run number cannot be empty."),
  bha_number: yup.number().integer().required("BHA number cannot be empty."),
  yn_mwd_serials: yup.boolean(),
  yn_bha_serials: yup.boolean(),
  yun_surface_serials: yup.boolean(),
  yn_drilling_parameters: yup.boolean(),
  yn_mud_properties: yup.boolean(),
});

export const IncidentForm = () => {
  const {
    register,
    errors,
    handleSubmit,
    control,
    setValue,
    getValues,
    triggerValidation,
  } = useForm({ validationSchema: validation_schema });

  const [bhaSerialRows, setBhaSerialRows] = useState([
    { dropdownValue: "", textValue: "" },
  ]);

  const [bhaSerialOptions, setBhaSerialOptions] = useState(optionBHAComponents)

  useEffect(() => {
    register({ name: "personnel_mwd" }, { required: true });
    register({ name: "personnel_dd" }, { required: true });
    register({ name: "incident_date" }, { required: true });
    register({ name: "well_section" }, { required: true });
    register({ name: "estimated_downtime" }, { required: true });
    register({ name: "incident_involving" }, { required: true });
    register({ name: "incident_occurred" }, { required: true });
    register({ name: "incident_general" }, { required: true });
    register({ name: "run_number" }, { required: true });
    register({ name: "bha_number" }, { required: true });
    register({ name: "yn_mwd_serials" }, { required: true });
    register({ name: "yn_bha_serials" }, { required: true });
    register({ name: "yn_surface_serials" }, { required: true });
    register({ name: "yn_drilling_parameters" }, { required: true });
    register({ name: "yn_mud_parameters" }, { required: true });

    register({ name: "bha-component-dropdown-0" }, { required: true });
    register({ name: "bha-component-serial-0" }, { required: true });
  }, [register]);

  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    alert(JSON.stringify(data));
  };

  const handleNewBhaSerial = (e) => {
    setBhaSerialRows([...bhaSerialRows, {dropdownValue: "", textValue: ""}]);
    // registerDynamicDropdownText(dropdownPrefix, textPrefix);
  };

  // const registerDynamicDropdownText = (dropdownPrefix, textPrefix) => {
  //   register({ name: dropdownPrefix }, { required: true });
  //   register({ name: textPrefix }, { required: true });
  // };

  return (
    <>
      <DevTool control={control} />
      {JSON.stringify(errors)}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Segment textAlign={"left"}>
          <Header as={"h3"}>General</Header>

          <Form.Group>
            <Form.Dropdown
              name="personnel_mwd"
              label={"MWD Personnel"}
              multiple={true}
              search={true}
              selection={true}
              options={tempUserOption}
              required={true}
              placeholder={"Frank Reynolds"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.personnel_mwd}
            />
            <Form.Dropdown
              name="personnel_dd"
              label={"DD Personnel"}
              multiple={true}
              search={true}
              selection={true}
              placeholder={"Charles Kelly"}
              options={tempUserOption}
              required={true}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.personnel_dd}
            />
            <Form.Input
              name={"incident_date"}
              label={"Incident Date"}
              required={true}
              type={"date"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.incident_date}
            />
            <Form.Dropdown
              name="well_section"
              label={"Well Section"}
              multiple={true}
              search={true}
              selection={true}
              options={optionsWellSection}
              required={true}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.well_section}
            />
            <Form.Input
              name={"estimated_downtime"}
              label="Estimated Downtime"
              required={true}
              type={"number"}
              min={0}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.estimated_downtime}
            />
          </Form.Group>
          <Form.Group>
            <Form.Dropdown
              name={"incident_involving"}
              label={"Incident Involving"}
              multiple={true}
              search
              selection={true}
              options={optionsIncidentInvolving}
              required={true}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.incident_involving}
            />

            <Form.Dropdown
              options={optionsIncidentOccurred}
              name={"incident_occurred"}
              label={"Incident Occurred"}
              multiple
              search={false}
              required
              selection={true}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.incident_occurred}
            />

            <Form.Dropdown
              options={optionsIncidentGeneral}
              name={"incident_general"}
              label={"Incident"}
              multiple
              search={false}
              required
              selection={true}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.incident_general}
            />
            <Form.Input
              name={"run_number"}
              label={"Run Number"}
              required
              type="number"
              width={2}
              min={0}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.run_number}
            />
            <Form.Input
              name={"bha_number"}
              label={"BHA Number"}
              required
              type="number"
              width={2}
              min={0}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.bha_number}
            />
          </Form.Group>
        </Segment>
        <Segment textAlign={"left"}>
          <Header as={"h3"}>
            Which of the following pertain to this incident?
          </Header>
          <Form.Group>
            <Form.Checkbox
              name={"yn_mwd_serials"}
              label={"MWD Tool Serials"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.yn_mwd_serials}
            />
            <Form.Checkbox
              name={"yn_dd_serials"}
              label={"DD Tool Serials"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.yn_dd_serials}
            />
            <Form.Checkbox
              name={"yn_surface_serials"}
              label={"Surface Equipment Serials"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.yn_surface_serials}
            />
            <Form.Checkbox
              name={"yn_drilling_parameters"}
              label={"Drilling Parameters"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.yn_drilling_parameters}
            />
            <Form.Checkbox
              name={"yn_mud_parameters"}
              label={"Mud Parameters"}
              onChange={async (e, { name, value }) => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.yn_mud_parameters}
            />
          </Form.Group>
        </Segment>
        <Segment textAlign={"left"}>{/*TODO: MWD TOOL SERIALS*/}</Segment>
        <Segment textAlign={"left"}>
          <DynamicDropdownText
            dropdownPrefix={"bha-component-dropdown"}
            dropdownLabel={"BHA Component"}
            dropdownPlaceholder={"Motor"}
            dropdownOptions={optionBHAComponents}
            textOptions={optionBHAComponents}
            textPrefix={"bha-component-serial"}
            textLabel={"Serial No."}
            textPlaceholder={'ABC123'}

            handleChange={setBhaSerialRows}
            rows={bhaSerialRows}
            setValue={setValue}
            setOptions={setBhaSerialOptions}
            values={getValues}
            triggerValidation={triggerValidation}
            errors={errors}
          />
          <Form.Button
            onClick={(e) => {handleNewBhaSerial()}}
          >
            Add Another
          </Form.Button>
        </Segment>
        <Button
          type="submit"
          onClick={() => {
            triggerValidation();
          }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
