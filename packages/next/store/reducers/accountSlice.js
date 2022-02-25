import { createSelector, createSlice } from "@reduxjs/toolkit";

import { setCookie, getCookie, clearCookie } from "frontedUtils/cookie";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: undefined,
    avaliableNetworks: [],
  },
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = payload;
      } else {
        state.account = null;
      }
      if (typeof window !== "undefined") {
        setCookie("account", `${payload.network}/${payload.address}`, 7);
      }
    },
    setAvaliableNetworks: (state, { payload }) => {
      state.avaliableNetworks = payload;
    },
  },
});

export const { setAccount, setAvaliableNetworks } = accountSlice.actions;

export const logout = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    clearCookie();
  }
  dispatch(setAccount(""));
};

export const avaliableNetworksSelector = state => state.account.avaliableNetworks;

export const accountSelector = (state) => {
  if (state.account.account) {
    return state.account.account;
  } else {
    if (typeof window !== "undefined") {
      const data = getCookie("account");
      if (data) {
        const [network, address] = data.split("/");
        const account = {
          address,
          network,
        };
        setAccount(account);
        return account;
      }
    }
    return null;
  }
};

export const loginAccountSelector = createSelector(
  avaliableNetworksSelector,
  accountSelector,
  (networks, account) => {
    const network = networks.find(item => item.network === account?.network);
    if (!network) {
      return null;
    }
    return {
      ...network,
      ...account,
    };
  }
);

export default accountSlice.reducer;
