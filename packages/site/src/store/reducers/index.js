import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import toastReducer from "./toastSlice";
import showConnectReducer from "./showConnectSlice";

export default combineReducers({
  account: accountReducer,
  toast: toastReducer,
  showConnect: showConnectReducer,
});
