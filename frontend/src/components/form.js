import React from "react";
import { Field, Formik, getIn, useField } from "formik";
import * as Yup from "yup";

import {
  Button,
  Card,
  Dimmer,
  Icon,
  Grid,
  Form as SForm,
  Segment,
  Loader,
  Header,
  Input,
  Progress,
} from "semantic-ui-react";

// export const MyTextInput = ({ label, width, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and also replace ErrorMessage entirely.
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <SForm.Input
//         width={width}
//         label={label}
//         control={Input}
//         placeholder={label}
//         {...field}
//         {...props}
//       />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

const getFormikFieldError = (form, field) => {
  const { name } = field;
  const { serverValidation } = form.status || {};
  const touched = getIn(form.touched, name);
  const checkTouched = serverValidation ? !touched : touched;
  return checkTouched && getIn(form.errors, name);
};

const setFormikFieldValue = (form, name, value, shouldValidate) => {
  form.setFieldValue(name, value, shouldValidate);
  form.setFieldTouched(name, true, shouldValidate);
};

export const FormField = ({
  component,
  componentProps = {},
  fieldParams = [],
  validations = [],
  ...fieldProps
}) => (
  <Field
    {...fieldProps}
    render={(props) => {
      var { id } = componentProps;
      if (!id) {
        id = "form_field_" + name;
      }
      let extraParams = {};
      extraParams["required"] = validations.some(item => (
          item.type === "required"))
      fieldParams.forEach((param) => {
        const { params, type } = param;
        extraParams[type] = [...params];
      });
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
        ...extraParams,
        onChange: (e, { name, value }) => {
          setFormikFieldValue(form, name, value, true);
        },
        onBlur: form.handleBlur,
      });
    }}
  />
);

export function createYupSchema(schema, config) {
  const { id, validationType, validations = [] } = config;
  if (!Yup[validationType]) {
    return schema;
  }
  let validator = Yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    // console.log(type, params);
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}
