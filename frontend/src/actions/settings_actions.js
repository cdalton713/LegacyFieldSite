import axios from "axios";
import { types } from "../reducers/types";
import { setAllJobs } from "../reducers/jobs_reducer";
import { getToken } from "../adalConfig";

export const fetchTheme = (darkMode) => {
  return (dispatch) =>
    dispatch({
      type: types.SWITCH_THEME,
      darkMode: !darkMode,
    });
};