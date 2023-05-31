import { createSelector, createSlice } from "@reduxjs/toolkit";

import { clearCookie, getCookie, setCookie } from "frontedUtils/cookie";
import { isAddress } from "@polkadot/util-crypto";
import { chainConfigsMap, evmChains } from "../../frontedUtils/consts/chains";
import encodeAddressByChain from "../../frontedUtils/chain/addr";
import nextApi from "services/nextApi";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    balance: null,
    delegation: null,
    useProxy: false,
    proxy: null, // the proxy address
    proxyBalance: null,
    proxyDelegation: null,
    availableNetworks: [],
    joinedSpaces: [],
  },
  reducers: {
    setAccount: (state, { payload }) => {
      if (payload) {
        state.account = payload;
        if (typeof window !== "undefined") {
          setCookie("addressV3", `${payload.network}/${payload.address}`, 7);
        }
      } else {
        state.account = null;
        if (typeof window !== "undefined") {
          clearCookie("addressV3");
        }
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
    setProxyDelegation(state, { payload }) {
      state.proxyDelegation = payload;
    },
    setBalance(state, { payload }) {
      state.balance = payload;
    },
    setDelegation(state, { payload }) {
      state.delegation = payload;
    },
    setJoinedSpaces(state, { payload }) {
      state.joinedSpaces = payload;
    },
  },
});

export const {
  setAccount,
  setAvailableNetworks,
  setProxy,
  setBalance,
  setDelegation,
  setProxyBalance,
  setProxyDelegation,
  setUseProxy,
  setJoinedSpaces,
} = accountSlice.actions;

export const logout = () => async (dispatch) => {
  dispatch(setAccount(""));
};

export const availableNetworksSelector = (state) =>
  state.account.availableNetworks;

export const balanceSelector = (state) => state.account.balance;
export const delegationSelector = (state) => state.account.delegation;
export const proxyBalanceSelector = (state) => state.account.proxyBalance;
export const proxyDelegationSelector = (state) => state.account.proxyDelegation;
export const useProxySelector = (state) => state.account.useProxy;
export const joinedSpacesSelector = (state) => state.account.joinedSpaces;
const rawProxySelector = (state) => state.account.proxy;

export const targetBalanceSelector = createSelector(
  balanceSelector,
  proxyBalanceSelector,
  rawProxySelector,
  (balance, proxyBalance, rawProxy) => {
    return rawProxy ? proxyBalance : balance;
  },
);

export const clearProxy = () => (dispatch) => {
  dispatch(setProxy(null));
};

export const initAccount = () => async (dispatch) => {
  if (typeof window === "undefined") {
    return;
  }

  const data = getCookie("addressV3");
  if (!data) {
    return;
  }

  const [network, address] = data.split("/");
  if (
    !isAddress(address) ||
    !(network in chainConfigsMap || evmChains.includes(network))
  ) {
    return;
  }

  if (
    evmChains.includes(network) &&
    window.ethereum &&
    window.ethereum.isMetaMask
  ) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.includes(address)) {
        dispatch(
          setAccount({
            address,
            network,
          }),
        );
      } else {
        dispatch(setAccount(""));
      }
    } catch (e) {
      dispatch(setAccount(""));
    }
    return;
  }

  dispatch(
    setAccount({
      address,
      network,
    }),
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
  },
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
  },
);

export const loginAddressSelector = createSelector(
  loginNetworkSelector,
  accountSelector,
  (network, account) => {
    if (!network || !account) {
      return null;
    }

    return encodeAddressByChain(account.address, network.network);
  },
);

export const proxySelector = createSelector(
  loginNetworkSelector,
  rawProxySelector,
  (network, proxyAddress) => {
    if (network && proxyAddress) {
      return encodeAddressByChain(proxyAddress, network.network);
    }

    return proxyAddress;
  },
);

export const isEvmSelector = createSelector(loginNetworkSelector, (network) => {
  return evmChains.includes(network?.network);
});

export const canUseProxySelector = createSelector(
  loginNetworkSelector,
  ({ network } = {}) => {
    const configs = chainConfigsMap[network];
    return configs ? configs.hasProxy : false;
  },
);

export const fetchJoinedSpace = (address) => (dispatch) => {
  if (!address) {
    dispatch(setJoinedSpaces([]));
    return;
  }

  nextApi.fetch(`account/${address}/spaces`).then(({ result }) => {
    if (!result) {
      return;
    }

    dispatch(setJoinedSpaces(result));
  });
};

export default accountSlice.reducer;
