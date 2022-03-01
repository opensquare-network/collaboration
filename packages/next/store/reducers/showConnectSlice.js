import { createSlice } from "@reduxjs/toolkit";

const showConnectSlice = createSlice({
  name: "showConnect",
  initialState: {
    showConnect: false,
  },
  reducers: {
    popUpConnect(state) {
      state.showConnect = true
    },
    closeConnect(state) {
      state.showConnect = false
    },
  },
});

export const showConnectSelector = (state) => state.showConnect.showConnect;

export const { popUpConnect, closeConnect } = showConnectSlice.actions;

export default showConnectSlice.reducer;
