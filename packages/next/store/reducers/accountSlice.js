import { createSelector, createSlice } from "@reduxjs/toolkit";

import { clearCookie, getCookie, setCookie } from "frontedUtils/cookie";
import { encodeAddress, isAddress } from "@polkadot/util-crypto";
import { CHAINS, evmChains } from "../../frontedUtils/consts/chains";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
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

export const initAccount = () => (dispatch) => {
  if (typeof window === "undefined") {
    return;
  }

  const data = getCookie("addressV3");
  if (!data) {
    return;
  }

  const [network, address] = data.split("/");
  if (!isAddress(address) || !Object.values(CHAINS).includes(network)) {
    return;
  }

  dispatch(
    setAccount({
      address,
      network,
    })
  );
};

export const accountSelector = (state) => {
  if (state.account.account) {
    return state.account.account;
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

    let address = account.address;
    if (!evmChains.includes(network.network)) {
      address = encodeAddress(address, network.ss58Format);
    }

    return {
      ...network,
      ...account,
      address,
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

    if (evmChains.includes(network.network)) {
      return account.address;
    }

    return encodeAddress(account.address, network.ss58Format);
  }
);

export default accountSlice.reducer;
