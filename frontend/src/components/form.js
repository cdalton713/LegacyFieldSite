import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Segment, Form, Button } from "semantic-ui-react";
import { Formik, Field, getIn } from "formik";

const getFormikFieldError = (form, field) => {
  const { name } = field;
  const { serverValidation } = form.status || {};
  const touched = getIn(form.touched, name);
  const checkTouched = serverValidation ? !touched : touched;
  return checkTouched && getIn(form.errors, name);
};

const setFormikFieldValue = (form, name, value, shouldValidate) => {
  form.setFieldValue(name, value, shouldValidate);
  // form.setFieldTouched(name, true, shouldValidate);
};

const setFormikFieldBlur = (form, name, value, shouldValidate) => {
  // form.setFieldValue(name, value, shouldValidate);
  form.setFieldTouched(name, true, shouldValidate);
};

export const FormField = ({
  component,
  componentProps = {},
  ...fieldProps
}) => (
  <Field
    {...fieldProps}
    render={(props) => {
      var { id } = componentProps;
      if (!id) {
        id = "form_field_" + name;
      }
      var { field, form } = props;
      var { name, value } = field;
      const error = getFormikFieldError(form, field);
      componentProps.id = id;
      componentProps.error = error;
      const valueProps =
        typeof value === "boolean"
          ? { checked: value }
          : { value: value || "" };
      return React.createElement(component, {
        ...componentProps,
        ...field,
        ...props,
        ...valueProps,
        onChange: (e, { name, value }) => {
          setFormikFieldValue(form, name, value, true);
        },
        onBlur: form.handleBlur,
        // onBlur: (e, { form, name, value, shouldValidate }) => {
        //   setFormikFieldBlur(form, name, value, true);
        // },
      });
    }}
  />
);
