import { createSlice } from "@reduxjs/toolkit";

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
            window.localStorage.clear("account");
          } else {
            setAccount(account);
            return account;
          }
        }
      }
    }
    return null;
  }
};

export default accountSlice.reducer;
