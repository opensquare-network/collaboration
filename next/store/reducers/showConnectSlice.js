import { createSlice } from "@reduxjs/toolkit";

const showConnectSlice = createSlice({
  name: "showConnect",
  initialState: {
    showConnect: false,
    showHeaderMenu: false,
  },
  reducers: {
    popUpConnect(state) {
      state.showConnect = true;
    },
    closeConnect(state) {
      state.showConnect = false;
    },
    setShowHeaderMenu(state, { payload }) {
      state.showHeaderMenu = payload;
    },
  },
});

export const showConnectSelector = (state) => state.showConnect.showConnect;
export const showHeaderMenuSelector = (state) =>
  state.showConnect.showHeaderMenu;

export const { popUpConnect, closeConnect, setShowHeaderMenu } =
  showConnectSlice.actions;

export default showConnectSlice.reducer;
