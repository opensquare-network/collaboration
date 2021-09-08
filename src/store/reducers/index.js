import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import toastReducer from "./toastSlice";

export default combineReducers({
  account: accountReducer,
  toast: toastReducer,
});
