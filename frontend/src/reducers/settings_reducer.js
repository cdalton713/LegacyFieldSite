import { types } from "./types";

const initialState = {darkMode: false};

export const setDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_THEME:
      return { darkMode: action.darkMode};
    default:
      return state;
  }
};