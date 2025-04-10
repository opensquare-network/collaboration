import { useCallback, useEffect, useMemo, useState } from "react";
import NoMetamask from "@/components/connect/metamask/noMetamask";
import { evmChainId } from "../../../frontedUtils/consts/chains";
import WrongNetwork from "@/components/connect/metamask/wrongNetwork";
import MetamaskNoAccount from "@/components/connect/metamask/noAccount";
import AccountsList from "../wallets/accountsList";

function useSubMetamaskChainChanged(callback) {
  useEffect(() => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      return;
    }
    window.ethereum.on("chainChanged", callback);
    return () => {
      window.ethereum.removeListener("chainChanged", callback);
    };
  }, [callback]);
}

function useChainId() {
  const [chainId, setChainId] = useState(null);

  const fetch = useCallback(() => {
    if (window?.ethereum) {
      window.ethereum
        .request({ method: "eth_chainId" })
        .then((id) => setChainId(parseInt(id)));
    }
  }, []);

  useSubMetamaskChainChanged(fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return chainId;
}

function useAccounts() {
  const [accounts, setAccounts] = useState([]);

  const fetch = useCallback(() => {
    if (window?.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accs) => setAccounts(accs));
    }
  }, []);

  useSubMetamaskChainChanged(fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return accounts;
}

function MetamaskAccounts({ chain }) {
  const chainId = useChainId();
  const accounts = useAccounts();
  const evmAccounts = useMemo(
    () => accounts.map((acc) => ({ address: acc })),
    [accounts],
  );

  if (chainId !== evmChainId[chain.network]) {
    return <WrongNetwork network={chain.network} />;
  }

  if (accounts.length <= 0) {
    return <MetamaskNoAccount />;
  }

  return <AccountsList chain={chain} accounts={evmAccounts} />;
}

export function MetamaskAccountList({ chain }) {
  if (!window?.ethereum || !window?.ethereum.isMetaMask) {
    return <NoMetamask />;
  }
  return <MetamaskAccounts chain={chain} />;
}
