import { createSlice } from "@reduxjs/toolkit";

import { setCookie, getCookie, clearCookie } from "frontedUtils/cookie";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: undefined,
  },
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = { address: payload };
      } else {
        state.account = null;
      }
      if (typeof window !== "undefined") {
        setCookie("address", payload, 7);
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
        setAccount({ address });
        return { address };
      }
    }
    return null;
  }
};

export default accountSlice.reducer;
