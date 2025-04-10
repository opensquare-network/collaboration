import useInjectedWeb3 from "./useInjectedWeb3";
import WalletTypes from "./walletTypes";

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

  if (extensionName === WalletTypes.NOVA) {
    return {
      loading,
      injectedExtension: injectedWeb3[WalletTypes.POLKADOT_JS],
    };
  }

  return {
    loading,
    injectedExtension: injectedWeb3[extensionName],
  };
}
