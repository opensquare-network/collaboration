import useInjectedWeb3 from "./useInjectedWeb3";
import WalletTypes from "./walletTypes";

export function findInjectedWeb3(injectedWeb3, extensionName) {
  if (!injectedWeb3 || !extensionName) {
    return null;
  }

  if (extensionName === WalletTypes.NOVA) {
    return injectedWeb3[WalletTypes.POLKADOT_JS];
  }

  return injectedWeb3[extensionName];
}

export default function useInjectedExtension(extensionName) {
  const { loading, injectedWeb3 } = useInjectedWeb3();

  if (!extensionName) {
    return {
      loading: false,
      injectedExtension: null,
    };
  }

  if (loading || !injectedWeb3) {
    return {
      loading,
      injectedExtension: null,
    };
  }

  const injectedExtension = findInjectedWeb3(injectedWeb3, extensionName);
  return {
    loading,
    injectedExtension,
  };
}
