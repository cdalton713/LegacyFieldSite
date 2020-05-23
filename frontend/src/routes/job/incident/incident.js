import React, { useState } from "react";
import { Formik, Field, getIn } from "formik";
import {
  Container,
  Header,
  Grid,
  Segment,
  Form,
  Button,
  Menu,
  Divider,
} from "semantic-ui-react";
import * as Yup from "yup";
import { FormField } from "../../../components/form";
import { useSelector } from "react-redux";
import { fields } from "./fields";
import { createYupSchema } from "../../../components/form";

const handleSubmit = (values) => {
  console.log("submitted");
};

const initial_values = Object.fromEntries(
  fields.map((item) => [item.name, item.default])
);

const yepSchema = fields.reduce(createYupSchema, {});
// console.log(yepSchema)
const validateSchema = Yup.object().shape(yepSchema);

const GenerateField = (props) => {
  const obj = fields.find((item) => {
    return item.id === props.id;
  });

  return (
    <FormField
      name={obj.id}
      componentProps={{ id: obj.id, label: obj.label, type:obj.type, ...props }}
      component={obj.form}
      placeholder={obj.placeholder}
      validationType={obj.validationType}
      value={obj.value}
      fieldParams={obj.fieldParams}
      validations={obj.validations}
    />
  );
};

const IncidentForm = (props) => {
  return (
    <Formik
      initialValues={initial_values}
      enableReinitialize={false}
      validationSchema={validateSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
      render={(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Segment attached={true} textAlign={"left"}>
            <Header as={"h3"} inverted={props.darkMode}>
              General
            </Header>
            <Form.Group>
              <GenerateField id={"personnel_mwd"} width={5} />
              {/*<GenerateField id={"personnel_dd"}  width={5}/>*/}
              {/*<GenerateField id={"incident_date"} width={3}/>*/}
              {/*<GenerateField id={"well_section"}  width={3}/>*/}
            </Form.Group>
            <Form.Group>
              {/*<GenerateField id={"estimated_downtime"} />*/}
              {/*<GenerateField id={"incident_involving"} />*/}
              {/*<GenerateField id={"incident_occurred"} />*/}
              {/*<GenerateField id={"incident_general"} />*/}
              {/*<GenerateField id={"run_number"} />*/}
              {/*<GenerateField id={"bha_number"} />*/}
            </Form.Group>
          </Segment>
          <Button type="submit" primary>
            Save
          </Button>
        </Form>
      )}
    />
  );
};

export const Incident = () => {
  return <IncidentForm />;
};
