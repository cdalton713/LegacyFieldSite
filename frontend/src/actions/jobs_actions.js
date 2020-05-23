import axios from "axios";
import { types } from "../reducers/types";
import { setAllJobs } from "../reducers/jobs_reducer";
import { getToken } from "../adalConfig";
import API from "./api";

export const fetchAllJobs = () => {
  const url = "/Jobs";
  return async (dispatch) => {
    try {
      const response = await API.get(url);
      dispatch({
        type: types.FETCH_ALL_JOBS,
        loaded: true,
        error: false,
        error_message: null,
        data: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_ALL_JOBS,
        loaded: true,
        error: true,
        error_message: error,
      });
    }
  };
};

export const fetchSelectedJob = (data, allJobs) => {
  const filtered_to_selected_job = allJobs.find(
    (obj) => obj.job_num === data.job_num
  );
  return (dispatch) =>
    dispatch({
      type: types.SELECTED_NEW_JOB,
      data: filtered_to_selected_job,
      selected: true
    });
};
// export const fetchAllJobs = async () => {
//   const url = "/api/v1/Jobs";
//   const token = getToken()
//
//   return apiAction({
//     url: url,
//     onSuccess: setAllJobs,
//     onFailure: () => console.log("Error loading all jobs."),
//     label: types.FETCH_ALL_JOBS,
//     headersOverride: token,
//   });
// };
//
// const apiAction = ({
//   url = "",
//   method = "GET",
//   data = null,
//   accessToken = null,
//   onSuccess = () => {},
//   onFailure = () => {},
//   label = "",
//   headersOverride = null,
// }) => {
//   return {
//     type: types.API,
//     payload: {
//       url,
//       method,
//       data,
//       accessToken,
//       onSuccess,
//       onFailure,
//       label,
//       headersOverride,
//     },
//   };
// };

// export const loginUser = () => {
//   const token = authProvider.getAccessToken();
//   const headers = { Authorization: `Bearer ` + token.getAccessToken() };
//   const url = "/api/v1/user/current";
//
//   return function (dispatch) {
//     axios.get(url, { headers }).then((response) =>
//       dispatch({
//         type: types.SET_CURRENT_USER,
//         id: response,
//         login: response,
//         isAuthenticated: response,
//       })
//     );
//   };
// };
