import { FETCH_ACTIVE_JOB } from "../actions/actions";

const initialState = {
  selectedJob: {
    well_id: "NA",
    job_id: "NA",
    job_num: "NA",
    well_name: "NA",
    rig: "NA",
    customer: "NA",
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "NEW_ACTIVE_JOB":
      return {
        selectedJob: {
          well_id: state.well_id,
          job_id: state.job_id,
          job_num: state.job_num,
          well_name: state.well_name,
          rig: state.rig,
          customer: state.customer,
        },
      };
    default:
      return state;
  }
}
