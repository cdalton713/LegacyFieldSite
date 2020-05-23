import React, { useState, Component } from "react";
import { Dropdown, Input, Select } from "semantic-ui-react";
import {useSelector} from "react-redux";

export const NumberInput = (props) => {
  return (
    <div>
      <Input
        onChange={props.handleChange}
        label={props.label || "!! MISSING !!"}
        labelPosition="left"
        type="number"
        min={props.min || 0}
      />
      {/* <b>TEST: {value}</b> */}
    </div>
  );
};

export const DropdownSelection = (props) => {
    const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <div>
      <Dropdown
        onChange={props.handleChange}
        placeholder={props.label || "!! MISSING !!"}
        options={props.options}
        selection
      />
      {/* <b>TEST: {value}</b> */}
    </div>
  );
};
