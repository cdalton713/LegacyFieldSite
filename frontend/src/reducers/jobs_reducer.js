import { types } from "./types";

const initialState = {};
export const setAllJobs = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_JOBS:
      return action;
    default:
      return state;
  }
}

export const setSelectedJob = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_NEW_JOB:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
