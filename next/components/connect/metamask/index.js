import { useEffect, useState } from "react";
import NoMetamask from "@/components/connect/metamask/noMetamask";
import { ActionBar } from "@/components/connect/styled";
import ConnectButton from "@/components/connect/connectButton";
import { evmChainId } from "../../../frontedUtils/consts/chains";
import WrongNetwork from "@/components/connect/metamask/wrongNetwork";
import MetamaskNoAccount from "@/components/connect/metamask/noAccount";

function useChainId() {
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum
        .request({ method: "eth_chainId" })
        .then((id) => setChainId(parseInt(id)));
    }
  }, []);

  return chainId;
}

function useAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accs) => setAccounts(accs));
    }
  }, []);

  return accounts;
}

export function MetamaskElement({ network }) {
  const chainId = useChainId();
  const accounts = useAccounts();

  if (!window?.ethereum || !window?.ethereum.isMetaMask) {
    return <NoMetamask />;
  }

  if (chainId !== evmChainId[network]) {
    return <WrongNetwork network={network} />;
  }

  if (accounts.length <= 0) {
    return <MetamaskNoAccount />;
  }

  return (
    <ActionBar>
      <ConnectButton
        address={accounts[0]}
        network={network}
        isMetamask={true}
      />
    </ActionBar>
  );
}
