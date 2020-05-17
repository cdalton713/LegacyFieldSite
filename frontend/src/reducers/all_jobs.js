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
