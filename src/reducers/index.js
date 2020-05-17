import {applyMiddleware, combineReducers, createStore} from "redux";
import ActiveJob from "./selected_job";
import { setAllJobs } from "./all_jobs";
import { authorizationReducer} from "./authorization";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  // activeJob: ActiveJob,
  allJobsReducer: setAllJobs,
  authorizationReducer
});

export const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);