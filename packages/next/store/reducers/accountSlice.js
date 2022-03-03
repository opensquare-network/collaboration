import { createSelector, createSlice } from "@reduxjs/toolkit";

import { setCookie, getCookie, clearCookie } from "frontedUtils/cookie";
import { encodeAddress } from "@polkadot/util-crypto";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: undefined,
    availableNetworks: [],
  },
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = payload;
      } else {
        state.account = null;
      }
      if (typeof window !== "undefined") {
        setCookie("addressV3", `${payload.network}/${payload.address}`, 7);
      }
    },
    setAvailableNetworks: (state, { payload }) => {
      state.availableNetworks = payload;
    },
  },
});

export const { setAccount, setAvailableNetworks } = accountSlice.actions;

export const logout = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    clearCookie();
  }
  dispatch(setAccount(""));
};

export const availableNetworksSelector = (state) =>
  state.account.availableNetworks;

export const accountSelector = (state) => {
  if (state.account.account) {
    return state.account.account;
  } else {
    if (typeof window !== "undefined") {
      const data = getCookie("addressV3");
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

export const loginNetworkSelector = createSelector(
  availableNetworksSelector,
  accountSelector,
  (networks, account) => {
    return networks.find((item) => item.network === account?.network);
  }
);

export const loginAccountSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    if (!network) {
      return null;
    }
    return {
      ...network,
      ...account,
    };
  }
);

export const loginAddressSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    if (!network || !account) {
      return null;
    }
    return encodeAddress(account.address, network.ss58Format);
  }
);

export default accountSlice.reducer;
