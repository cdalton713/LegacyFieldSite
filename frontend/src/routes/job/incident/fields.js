// import React from "react";
// import { Form } from 'semantic-ui-react'
// import {DateInput} from 'semantic-ui-calendar-react'
//
//
// export const fields = [
//   {id: 'personnel_mwd', label:"MWD Personnel", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'personnel_dd', label:"DD Personnel", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'incident_date', label:"Incident Date", placeholder: '', type: 'date', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'well_section', label:"Well Section", placeholder: '', type: 'text', form: Form.Select, validationType: 'string', fieldParams: [{type: 'options', params: optionsWellSection}], value: '', validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'estimated_downtime', label:"Estimated Downtime", placeholder: '', type: 'number', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//
//   {id: 'incident_involving', label:"Incident Involving", placeholder: '', type: 'text', form: Form.Select, validationType: 'string', value: '', fieldParams: [{type: 'options', params: optionsIncidentInvolving},{type: 'multiple', params: [true]}], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'incident_occurred', label:"Incident Occurred", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'incident_general', label:"Incident", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'run_number', label:"Run Number", placeholder: '', type: 'number', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'bha_number', label:"BHA Number", placeholder: '', type: 'number', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//
//   {id: 'ubho_type', label:"ubho_type", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'ubho_dropdown', label:"ubho_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'ubho_text', label:"ubho_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'ubho_check', label:"ubho_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'transmitter_dropdown', label:"transmitter_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'transmitter_text', label:"transmitter_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'transmitter_check', label:"transmitter_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'pulser_dropdown', label:"pulser_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'pulser_text', label:"pulser_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'pulser_check', label:"pulser_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'gamma_dropdown', label:"gamma_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'gamma_text', label:"gamma_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'gamma_check', label:"gamma_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_1_dropdown', label:"battery_1_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_1_text', label:"battery_1_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_1_check', label:"battery_1_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_2_dropdown', label:"battery_2_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_2_text', label:"battery_2_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'battery_2_check', label:"battery_2_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dir_dropdown', label:"dir_dropdown", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dir_text', label:"dir_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dir_check', label:"dir_check", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//
//   {id: 'bha_bit_text', label:"bha_bit_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'bha_motor_text', label:"bha_motor_text", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//
//   {id: 'dp_hole_depth', label:"dp_hole_depth", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_flow_rate', label:"dp_flow_rate", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_hole_size', label:"dp_hole_size", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_spm', label:"dp_spm", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_rpm', label:"dp_rpm", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_spp', label:"dp_spp", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_collar_id', label:"dp_collar_id", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_collar_od', label:"dp_collar_od", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_diff', label:"dp_diff", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_pulse_width', label:"dp_pulse_width", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_wob', label:"dp_wob", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'dp_pulse_height', label:"dp_pulse_height", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//
//   {id: 'mp_type', label:"mp_type", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_solids', label:"mp_solids", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_weight', label:"mp_weight", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_sand', label:"mp_sand", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_visc', label:"mp_visc", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_lcm', label:"mp_lcm", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is required.']}]},
//   {id: 'mp_ph', label:"mp_ph", placeholder: '', type: 'text', form: Form.Input, validationType: 'string', value: '', fieldParams: [], validations: [{type: 'required', params: ['This field is require.d']}]},
// ];