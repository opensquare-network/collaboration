import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import toastReducer from "./toastSlice";
import showConnectReducer from "./showConnectSlice";
import voteReducer from "./voteSlice";
import statusReducer from "./statusSlice";
import authoringReducer from "./authoringSlice";
import notificationReducer from "./notificationSlice";
import newSpaceReducer from "./newSpaceSlice";

export default combineReducers({
  account: accountReducer,
  toast: toastReducer,
  showConnect: showConnectReducer,
  vote: voteReducer,
  authoring: authoringReducer,
  status: statusReducer,
  notification: notificationReducer,
  newSpace: newSpaceReducer,
});
