import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import toastReducer from "./toastSlice";
import showConnectReducer from "./showConnectSlice";
import voteReducer from "./voteSlice";
import snapshotHeightSlice from "./snapshotHeightSlice";
import statusReducer from "./statusSlice";

export default combineReducers({
  account: accountReducer,
  toast: toastReducer,
  showConnect: showConnectReducer,
  vote: voteReducer,
  snapshotHeight: snapshotHeightSlice,
  status: statusReducer,
});
