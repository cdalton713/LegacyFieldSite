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
import { FormField } from "../../components/form";
import { useSelector } from "react-redux";
import { dark } from "@material-ui/core/styles/createPalette";

const initial_values = {
  firstName: "",
  lastName: "",
  email: "",
};
const UserSettings = () => {};

const GlobalSiteSettings = () => {};

const handleSubmit = (values) => {
  console.log("submitted");
};

const validate = (values) => {
  var errors = {};
  if (!values.firstName) errors.firstName = "required";
  if (!values.lastName) errors.lastName = "required";
  console.log(errors);
  return errors;
};

const menuItems = [
  { id: "myProfile", name: "My Profile" },
  { id: "globalSettings", name: "Global Settings" },
];

const Groups = (props) => {
  const [activeItem, setActiveItem] = useState("myProfile");

  const handleItemClick = (e, data) => {
    setActiveItem(data.id);
  };

  return (
    <Menu pointing secondary vertical inverted={props.darkMode}>
      {menuItems.map((item) => (
        <Menu.Item
          name={item.name}
          key={item.id}
          id={item.id}
          active={activeItem === item.id}
          onClick={handleItemClick}
        />
      ))}
    </Menu>
  );
};

const validation_schema = {
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  jobType: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
};

const required = (value) => {
  const result = value ? undefined : "Required";
  //console.log("required", { value, result });
  return result;
};

const MyForm = (props) => (
  <Formik
    initialValues={initial_values}
    enableReinitialize={false}
    validationSchema={Yup.object(validation_schema)}
    onSubmit={handleSubmit}
    render={(props) => (
      <Form onSubmit={props.handleSubmit}>
        <Segment attached={true}>
          <Header inverted={props.darkMode}>
            My Profile
          </Header>
          <Form.Group>
            <FormField
              name="firstName"
              component={Form.Input}
              componentProps={{
                label: "First Name",
              }}
              validate={required}
            />

            <FormField
              name="lastName"
              component={Form.Input}
              componentProps={{
                label: "Last Name",
              }}
              validate={required}
            />
          </Form.Group>
          <Form.Group>
            <FormField
              name="email"
              component={Form.Input}
              componentProps={{
                label: "Email",
              }}
              validate={required}
            />
          </Form.Group>
          <Header inverted={props.darkMode}>
            Alerts and Notifications
          </Header>
        </Segment>
        <Button type="submit" primary>
          Save
        </Button>
      </Form>
    )}
  />
);

export const SettingsPage = (props) => {
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <div className="container-all-padding">
      {/*<Groups darkMode={props.darkMode} />*/}
      <MyForm darkMode={darkMode} />
    </div>
  );
};
