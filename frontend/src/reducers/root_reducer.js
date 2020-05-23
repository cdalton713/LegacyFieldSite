import { applyMiddleware, combineReducers, createStore } from "redux";
import { setAllJobs } from "./jobs_reducer";
// import { authorizationReducer } from "./authorization";
import { composeWithDevTools } from "redux-devtools-extension";
import { setSelectedJob } from "./jobs_reducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {setDarkMode} from "./settings_reducer";

const rootReducer = combineReducers({
  allJobs: setAllJobs,
  selectedJob: setSelectedJob,
  localSettings: setDarkMode
  // authorizationReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ["localSettings", 'selectedJob'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const rootStore = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(rootStore);
