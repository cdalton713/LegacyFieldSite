import { types } from "./types";

const initialState = {};
export const setAllJobs = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_JOBS:
      return action;
    default:
      return state;
  }
};
const setSelectedJobInitial = { data: null, selected: false, subPage: 'upload' };
export const setSelectedJob = (state = setSelectedJobInitial, action) => {
  switch (action.type) {
    case types.SELECTED_NEW_JOB:
      return { ...state, data: action.data, selected: action.selected };
    case types.SELECT_JOB_SUBPAGE:
      return  { ...state, subPage: action.data };
    default:
      return state;
  }
};


