import { createSlice } from "@reduxjs/toolkit";

import { setCookie, getCookie, clearCookie } from "frontedUtils/cookie";

const accountSlice = createSlice({
  name: "account",
  initialState: {},
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = { ...state.account, ...payload };
      } else {
        state.account = null;
      }
      if (typeof window !== "undefined") {
        setCookie("address", JSON.stringify(state.account), 7);
      }
    },
  },
});

export const { setAccount } = accountSlice.actions;

export const logout = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    clearCookie();
  }
  dispatch(setAccount(""));
};

export const accountSelector = (state) => {
  if (state.account.account) {
    return state.account.account;
  } else {
    if (typeof window !== "undefined") {
      const address = getCookie("address");
      if (address) {
        try {
          setAccount(JSON.parse(address));
          return JSON.parse(address);
        } catch (e) {}
      }
    }
    return null;
  }
};

export default accountSlice.reducer;
