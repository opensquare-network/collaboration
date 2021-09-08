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
    },
  },
});

export const { setAccount } = accountSlice.actions;

export const fetchAccountProfile = () => async (dispatch) => {
  const { result } = await nextApi.fetch("auth/profile");
  if (result) dispatch(setAccount(result));
};

export const logout = () => async (dispatch) => {
  dispatch(setAccount(null));
};

export const accountSelector = (state) => state.account.account;

export default accountSlice.reducer;
