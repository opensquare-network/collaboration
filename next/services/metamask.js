import { evmChainId } from "../frontedUtils/consts/chains";
import {
  isEvmSelector,
  loginAccountSelector,
  logout,
} from "../store/reducers/accountSlice";
import { sameIgnoreCase } from "../frontedUtils/strs/same";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useMetaMaskEventHandlers() {
  const dispatch = useDispatch();

  if (
    typeof window !== "undefined" &&
    (!window.ethereum || !window.ethereum.isMetaMask)
  ) {
    return;
  }

  const isEvm = useSelector(isEvmSelector);
  const { network: loginNetwork, address } =
    useSelector(loginAccountSelector) || {};

  const onChainChanged = useCallback(
    (chainId) => {
      if (isEvm && evmChainId[loginNetwork] !== parseInt(chainId)) {
        dispatch(logout());
      }
    },
    [dispatch, isEvm, loginNetwork],
  );

  const onAccountsChanged = useCallback(
    (accounts = []) => {
      const firstAccount = accounts[0];
      if (isEvm && !sameIgnoreCase(address, firstAccount)) {
        dispatch(logout());
      }
    },
    [dispatch, isEvm, address],
  );

  useEffect(() => {
    if (!isEvm) {
      return;
    }

    window.ethereum.on("chainChanged", onChainChanged);
    window.ethereum.on("accountsChanged", onAccountsChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", onChainChanged);
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
    };
  }, [isEvm, onAccountsChanged, onChainChanged]);
}
