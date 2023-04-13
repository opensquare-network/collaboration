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
import { getMetamaskElement } from "@/components/connect/metamask";

const Wrapper = styled.div``;

export default function Connect({ networks }) {
  const [chain, setChain] = useState(networks[0]);
  const [address, setAddress] = useState();
  const [element, setElement] = useState(null);
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

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
  }, [accounts]);

  const isEvmChain = evmChains.includes(chain?.network);

  useEffect(() => {
    if (!chain) {
      return;
    }

    if (isEvmChain) {
      getMetamaskElement(chain.network).then((element) => {
        setElement(element);
      });
      return;
    }

    if (detecting) {
      return setElement(null);
    }

    if (!hasExtension) {
      return setElement(<NoExtension />);
    }

    if (!extensionAccessible) {
      return setElement(<NotAccessible />);
    }

    if (accounts.length <= 0) {
      return setElement(<NoAccount />);
    }

    setElement(
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
      </>,
    );
  }, [
    extensionAccessible,
    accounts,
    hasExtension,
    detecting,
    isEvmChain,
    chain,
    address,
    chain?.network,
    metaMaskNetworkChangeCount,
  ]);

  return (
    <Wrapper>
      <Closeable open={!detecting}>
        <StyledText>Chain</StyledText>
        <ChainSelector
          chains={availableNetworks}
          onSelect={(chain) => setChain(chain)}
        />
        {element}
      </Closeable>
    </Wrapper>
  );
}
