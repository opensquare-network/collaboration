import { createSelector, createSlice } from "@reduxjs/toolkit";

import { clearCookie, getCookie, setCookie } from "frontedUtils/cookie";
import { isAddress } from "@polkadot/util-crypto";
import {
  CHAINS,
  evmChains,
  nonProxyChains,
} from "../../frontedUtils/consts/chains";
import encodeAddressByChain from "../../frontedUtils/chain/addr";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    balance: null,
    useProxy: false,
    proxy: null, // the proxy address
    proxyBalance: null,
    availableNetworks: [],
  },
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = payload;
      } else {
        state.account = null;
      }

      const isEvmChain = evmChains.includes(payload?.network);
      if (typeof window !== "undefined" && payload && !isEvmChain) {
        setCookie("addressV3", `${payload.network}/${payload.address}`, 7);
      }
    },
    setAvailableNetworks: (state, { payload }) => {
      state.availableNetworks = payload;
    },
    setUseProxy(state, { payload }) {
      state.useProxy = payload;
    },
    setProxy(state, { payload }) {
      state.proxy = payload;
    },
    setProxyBalance(state, { payload }) {
      state.proxyBalance = payload;
    },
    setBalance(state, { payload }) {
      state.balance = payload;
    },
  },
});

export const {
  setAccount,
  setAvailableNetworks,
  setProxy,
  setBalance,
  setProxyBalance,
  setUseProxy,
} = accountSlice.actions;

export const logout = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    clearCookie();
  }

  dispatch(setAccount(""));
};

export const availableNetworksSelector = (state) =>
  state.account.availableNetworks;

export const balanceSelector = (state) => state.account.balance;
export const proxyBalanceSelector = (state) => state.account.proxyBalance;
export const useProxySelector = (state) => state.account.useProxy;
const rawProxySelector = (state) => state.account.proxy;

export const targetBalanceSelector = createSelector(
  balanceSelector,
  proxyBalanceSelector,
  rawProxySelector,
  (balance, proxyBalance, rawProxy) => {
    return rawProxy ? proxyBalance : balance;
  }
);

export const clearProxy = () => (dispatch) => {
  dispatch(setProxy(null));
};

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

    let address = encodeAddressByChain(account.address, network.network);
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

    return encodeAddressByChain(account.address, network.network);
  }
);

export const proxySelector = createSelector(
  loginNetworkSelector,
  rawProxySelector,
  (network, proxyAddress) => {
    if (network && proxyAddress) {
      return encodeAddressByChain(proxyAddress, network.network);
    }

    return proxyAddress;
  }
);

export const isEvmSelector = createSelector(loginNetworkSelector, (network) => {
  return evmChains.includes(network?.network);
});

export const canUseProxySelector = createSelector(
  loginNetworkSelector,
  ({ network } = {}) => {
    return !nonProxyChains.includes(network);
  }
);

export default accountSlice.reducer;
