import { applyMiddleware, combineReducers, createStore } from "redux";
import { setAllJobs } from "./jobs_reducer";
// import { authorizationReducer } from "./authorization";
import { composeWithDevTools } from "redux-devtools-extension";
import { setSelectedJob } from "./jobs_reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  allJobsReducer: setAllJobs,
  selectedJobReducer: setSelectedJob,
  // authorizationReducer,
});

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
