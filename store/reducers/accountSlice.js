import { createSlice } from "@reduxjs/toolkit";

import nextApi from "services/nextApi";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: undefined,
  },
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("account", JSON.stringify(payload));
      }
    },
  },
});

export const { setAccount } = accountSlice.actions;

export const logout = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    window.localStorage.clear("account");
  }
  dispatch(setAccount(null));
};

export const accountSelector = (state) => {
  if (state.account.account) {
    return state.account.account;
  } else {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem("account");
      if (item) {
        const account = JSON.parse(item);
        if (account) {
          if (account.expires && new Date(account.expires) < new Date()) {
            setAccount(account);
            return account;
          } else {
            window.localStorage.clear("account");
          }
        }
      }
    }
    return null;
  }
};

export default accountSlice.reducer;
