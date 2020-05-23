import React, { useState } from "react";
import { Formik, Field, getIn, FormikProps } from "formik";
import {
  Container,
  Header,
  Grid,
  Segment,
  Menu,
  Divider,
} from "semantic-ui-react";
import {IncidentForm} from './incident2'
import {
  optionsIncidentInvolving,
  optionsWellSection,
  optionsIncidentOccurred,
  optionsIncidentGeneral,
  tempUserOption,
} from "../../incident/options";
import { FormField } from "../../../components/form";
// import {
//   Button,
//   Checkbox,
//   Dropdown,
//   Form,
//   Input,
//   TextArea,
// } from 'formik-semantic-ui';
// const handleSubmit = (values, actions) => {
//   console.log("submitted");
// };
// import {Incident}
// const initial_values = {
//   personnel_mwd: [],
//   personnel_dd: [],
//   incident_date: "",
//   well_section: "",
//   estimated_downtime: "",
//   incident_involving: [],
//   incident_occurred: [],
//   incident_general: [],
//   run_number: "",
//   bha_number: "",
//   yn_mwd_serials: "",
//   yn_bha_serials: "",
//   yun_surface_serials: "",
//   yn_drilling_parameters: "",
//   yn_mud_properties: "",
// };
//
// const validation_schema = {
//   personnel_mwd: yup
//     .array(yup.string())
//     .compact()
//     .required("MWD Personnel cannot be empty."),
//   personnel_dd: yup
//     .array(yup.string())
//     .compact()
//     .required("DD Personnel cannot be empty."),
//   incident_date: yup.date().required("Date cannot be empty."),
//   well_section: yup.string().required("Well Section cannot be empty."),
//   estimated_downtime: yup
//     .number()
//     .positive()
//     .required("Estimated Downtime cannot be empty."),
//   incident_involving: yup
//     .array(yup.string())
//     .required("Incident Involving cannot be empty."),
//   incident_occurred: yup
//     .array(yup.string())
//     .required("Incident Occurred cannot be empty."),
//   incident_general: yup
//     .array(yup.string())
//     .required("Incident cannot be empty."),
//   run_number: yup.number().integer().required("Run number cannot be empty."),
//   bha_number: yup.number().integer().required("BHA number cannot be empty."),
//   yn_mwd_serials: yup.boolean(),
//   yn_bha_serials: yup.boolean(),
//   yun_surface_serials: yup.boolean(),
//   yn_drilling_parameters: yup.boolean(),
//   yn_mud_properties: yup.boolean(),
// };
//
// const IncidentForm = (props) => {
//   console.log("RENDER");
//
//   return (
//       <Form
//         initialValues={initial_values}
//         onSubmit={handleSubmit}
//   )
//
//
//   // return (
//   //   <Formik
//   //     initialValues={initial_values}
//   //     enableReinitialize={false}
//   //     validationSchema={yup.object().shape(validation_schema)}
//   //     onSubmit={handleSubmit}
//   //   > {(FormikProps) => (
//   //             <Form loading={props.isSubmitting} onSubmit={handleSubmit}>
//   //       <Segment attached={true} textAlign={"left"}>
//   //         <Header as={"h3"}>General</Header>
//   //         {JSON.stringify(errors)}
//   //         <br />
//   //         <br />
//   //         {JSON.stringify(values)}
//   //         <Form.Group>
//   //           <FormField
//   //             name={"personnel_mwd"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "MWD Personnel",
//   //               multiple: true,
//   //               search: true,
//   //               options: tempUserOption,
//   //               required: true,
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"personnel_dd"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "DD Personnel",
//   //               multiple: true,
//   //               search: true,
//   //               options: tempUserOption,
//   //               required: true,
//   //             }}
//   //           />
//   //
//   //           <FormField
//   //             name={"incident_date"}
//   //             component={Form.Input}
//   //             componentProps={{
//   //               label: "Date of Incident",
//   //               required: true,
//   //               type: "date",
//   //             }}
//   //           />
//   //
//   //           <FormField
//   //             name={"well_section"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "Well Section",
//   //               multiple: false,
//   //               search: false,
//   //               options: optionsWellSection,
//   //               required: true,
//   //             }}
//   //           />
//   //
//   //           <FormField
//   //             name={"estimated_downtime"}
//   //             component={Form.Input}
//   //             componentProps={{
//   //               label: "Estimated Downtime",
//   //               required: true,
//   //               type: "number",
//   //             }}
//   //           />
//   //         </Form.Group>
//   //         <Form.Group>
//   //           <FormField
//   //             name={"incident_involving"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "Incident Involving",
//   //               multiple: true,
//   //               search: false,
//   //               options: optionsIncidentInvolving,
//   //               required: true,
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"incident_occurred"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "Incident Occurred",
//   //               multiple: true,
//   //               search: false,
//   //               options: optionsIncidentOccurred,
//   //               required: true,
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"incident_general"}
//   //             component={Form.Select}
//   //             componentProps={{
//   //               label: "Incident",
//   //               multiple: true,
//   //               search: false,
//   //               options: optionsIncidentGeneral,
//   //               required: true,
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"run_number"}
//   //             component={Form.Input}
//   //             componentProps={{
//   //               label: "Run Number",
//   //               required: true,
//   //               type: "number",
//   //               width: 2,
//   //               min: 0,
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"bha_number"}
//   //             component={Form.Input}
//   //             componentProps={{
//   //               label: "Bha Number",
//   //               required: true,
//   //               type: "number",
//   //               width: 2,
//   //               min: 0,
//   //             }}
//   //           />
//   //         </Form.Group>
//   //       </Segment>
//   //       <Segment>
//   //         <Header as={"h3"}>Are the following related to this incident?</Header>
//   //         <Form.Group>
//   //           <FormField
//   //             name={"yn_mwd_serials"}
//   //             component={Form.Input}
//   //             componentProps={{
//   //               label: "MWD Tool Serials",
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"yn_bha_serials"}
//   //             component={Form.Checkbox}
//   //             componentProps={{
//   //               label: "BHA Components",
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"yn_surface_serials"}
//   //             component={Form.Checkbox}
//   //             componentProps={{
//   //               label: "Surface Equipment Serials",
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"yn_drilling_parameters"}
//   //             component={Form.Checkbox}
//   //             componentProps={{
//   //               label: "Drilling Parameters",
//   //             }}
//   //           />
//   //           <FormField
//   //             name={"yn_mud_properties"}
//   //             component={Form.Checkbox}
//   //             componentProps={{
//   //               label: "Mud Properties",
//   //             }}
//   //           />
//   //         </Form.Group>
//   //       </Segment>
//   //
//   //       <Button type="submit" primary onClick={handleSubmit}>
//   //         Save
//   //       </Button>
//   //     </Form>
//   //   )}
//   //
//   //   </Formik>
//   //
//   //   // render={({
//   //   //   values,
//   //   //   errors,
//   //   //   touched,
//   //   //   handleBlur,
//   //   //   handleChange,
//   //   //   handleSubmit,
//   //   //   isSubmitting,
//   //   //   setFieldValue,
//   //   //   setFieldTouched,
//   //   //
//   //   //   ...props
//   //   // }) => {
//   //   //   return (
//   //
//   //   //   );
//   //   // }}
//   //   // />
//   // );
// };

export const Incident = () => {
  return <IncidentForm />;
};
