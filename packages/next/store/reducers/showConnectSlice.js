import { createSlice } from "@reduxjs/toolkit";

const showConnectSlice = createSlice({
  name: "showConnect",
  initialState: {
    showConnect: false,
  },
  reducers: {
    popUpConnect(state, {payload}) {
      return {showConnect: true};
    },
    closeConnect(state, {payload}) {
      return {showConnect: false};
    },
  },
});

export const showConnectSelector = (state) => state.showConnect.showConnect;

export const {popUpConnect, closeConnect} = showConnectSlice.actions;

export default showConnectSlice.reducer;
