import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  availableNetworksSelector,
  setAccount,
} from "store/reducers/accountSlice";

import AccountSelector from "../accountSelector";

import styled from "styled-components";
import { closeConnect } from "../../store/reducers/showConnectSlice";
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

export default function Connect({ space, setShowMenu }) {
  const dispatch = useDispatch();
  const [chain, setChain] = useState(space.networks[0]);
  const [address, setAddress] = useState();
  const [element, setElement] = useState(null);
  const availableNetworks = useSelector(availableNetworksSelector);
  const { accounts, hasExtension, extensionAccessible, detecting } =
    useExtension();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAddress(accounts[0].address);
    }
  }, [accounts]);

  const doConnect = async () => {
    try {
      dispatch(
        setAccount({
          address,
          network: chain.network,
        })
      );
      dispatch(closeConnect());
      setShowMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isEvmChain = evmChains.includes(chain?.network);

  useEffect(() => {
    if (isEvmChain) {
      getMetamaskElement(chain.network, dispatch, () =>
        setShowMenu(false)
      ).then((element) => {
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
          onSelect={(account) => setAddress(account?.address)}
          chain={chain}
        />

        <ActionBar>
          <ConnectButton doConnect={doConnect} />
        </ActionBar>
      </>
    );
  }, [
    dispatch,
    extensionAccessible,
    accounts,
    hasExtension,
    detecting,
    isEvmChain,
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
