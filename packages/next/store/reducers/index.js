import { combineReducers } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import toastReducer from "./toastSlice";
import showConnectReducer from "./showConnectSlice";
import voteReducer from "./voteSlice";
import statusReducer from "./statusSlice";
import authoringSlice from "./authoringSlice";
import metaMaskReducer from "./metamaskSlice";

export default combineReducers({
  account: accountReducer,
  toast: toastReducer,
  showConnect: showConnectReducer,
  vote: voteReducer,
  authoring: authoringSlice,
  status: statusReducer,
  metamask: metaMaskReducer,
});
