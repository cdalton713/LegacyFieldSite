import axios from "axios";
import { types } from "../reducers/types";
import { authProvider } from "../authProvider";
import { setAllJobs } from "../reducers/all_jobs";

export const fetchAllJobs = async () => {
  const url = "/api/v1/Jobs";
  const token = await authProvider.getAccessToken();

  return apiAction({
    url: url,
    onSuccess: setAllJobs,
    onFailure: () => console.log("Error loading all jobs."),
    label: types.FETCH_ALL_JOBS,
    headersOverride: token.accessToken,
  });
};

const apiAction = ({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null,
}) => {
  return {
    type: types.API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
    },
  };
};

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
