import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { availableNetworksSelector } from "store/reducers/accountSlice";

import AccountSelector from "../accountSelector";

import styled from "styled-components";
import ChainSelector from "@/components/chainSelector";
import { ActionBar, StyledText } from "@/components/connect/styled";
import NotAccessible from "@/components/connect/notAccessible";
import NoExtension from "@/components/connect/noExtension";
import NoAccount from "@/components/connect/noAccount";
import Closeable from "@/components/connect/closeable";
import useExtension from "../../frontedUtils/hooks/useExtension";
import { evmChains } from "../../frontedUtils/consts/chains";
import ConnectButton from "@/components/connect/connectButton";
import { MetamaskElement } from "@/components/connect/metamask";

const Wrapper = styled.div``;

function WalletAccount({
  chain,
  isEvmChain,
  detecting,
  hasExtension,
  extensionAccessible,
  accounts,
}) {
  const [address, setAddress] = useState();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
  }, [accounts]);

  if (isEvmChain) {
    return <MetamaskElement network={chain.network} />;
  }

  if (detecting) {
    return null;
  }

  if (!hasExtension) {
    return <NoExtension />;
  }

  if (!extensionAccessible) {
    return <NotAccessible />;
  }

  if (accounts.length <= 0) {
    return <NoAccount />;
  }

  return (
    <>
      <StyledText>Account</StyledText>
      <AccountSelector
        accounts={accounts}
        onSelect={(account) => {
          setAddress(account?.address);
        }}
        chain={chain}
      />

      <ActionBar>
        <ConnectButton address={address} network={chain.network} />
      </ActionBar>
    </>
  );
}

export default function Connect({ networks }) {
  const [chain, setChain] = useState(networks[0]);
  const availableNetworks = useSelector(availableNetworksSelector);
  const { accounts, hasExtension, extensionAccessible, detecting } =
    useExtension();

  const [metaMaskNetworkChangeCount, setMetaMaskNetworkChangeCount] =
    useState(1);

  useEffect(() => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      return;
    }
    window.ethereum.on("chainChanged", () => {
      setMetaMaskNetworkChangeCount(metaMaskNetworkChangeCount + 1);
    });
  }, [metaMaskNetworkChangeCount]);

  const isEvmChain = evmChains.includes(chain?.network);

  return (
    <Wrapper>
      <Closeable open={!detecting}>
        <ChainSelector
          chains={availableNetworks}
          onSelect={(chain) => setChain(chain)}
        />
        <WalletAccount
          chain={chain}
          isEvmChain={isEvmChain}
          detecting={detecting}
          hasExtension={hasExtension}
          extensionAccessible={extensionAccessible}
          accounts={accounts}
        />
      </Closeable>
    </Wrapper>
  );
}
