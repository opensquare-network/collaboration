import { evmChainId } from "../frontedUtils/consts/chains";
import {
  isEvmSelector,
  loginAccountSelector,
  logout,
} from "../store/reducers/accountSlice";
import { sameIgnoreCase } from "../frontedUtils/strs/same";

const { store } = require("../store");

export function registerMetaMaskEventHandlers() {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return;
  }

  const state = store.getState();
  const isEvm = isEvmSelector(state);
  const { network: loginNetwork, address } = loginAccountSelector(state) || {};

  window.ethereum.on("chainChanged", (chainId) => {
    if (isEvm && evmChainId[loginNetwork] !== parseInt(chainId)) {
      store.dispatch(logout());
    }
  });

  window.ethereum.on("accountsChanged", (accounts = []) => {
    console.log("accounts", accounts);
    const firstAccount = accounts[0];
    if (isEvm && !sameIgnoreCase(address, firstAccount)) {
      store.dispatch(logout());
    }
  });
}
