import { useMemo } from "react";
import MetamaskNoAccount from "./noAccount";
import AccountsList from "../accountsList";

export function MetamaskAccountList({ chain, accounts }) {
  const evmAccounts = useMemo(
    () => (accounts || []).map((acc) => ({ address: acc })),
    [accounts],
  );

  if (accounts.length <= 0) {
    return <MetamaskNoAccount />;
  }

  return <AccountsList chain={chain} accounts={evmAccounts} />;
}
