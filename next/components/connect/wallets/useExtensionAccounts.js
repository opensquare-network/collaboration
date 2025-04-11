import { useEffect, useState } from "react";
import useInjectedExtension from "./useInjectedExtension";

async function fetchAccounts(injectedExtension) {
  const walletExtension = await injectedExtension.enable("opensquare.io");
  return await walletExtension.accounts?.get();
}

export default function useExtensionAccounts(walletName) {
  const { loading, injectedExtension } = useInjectedExtension(walletName);
  const [accounts, setAccounts] = useState(null);
  const [isAccountsLoading, setIsAccountsLoading] = useState(true);

  useEffect(() => {
    if (loading || !walletName) {
      return;
    }
    if (!injectedExtension) {
      setIsAccountsLoading(false);
      return;
    }
    fetchAccounts(injectedExtension).then((accounts) => {
      setAccounts(accounts);
      setIsAccountsLoading(false);
    });
  }, [loading, injectedExtension, walletName]);

  return {
    accounts,
    loading: isAccountsLoading,
  };
}
