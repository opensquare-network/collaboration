import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  availableNetworksSelector,
  setAccount,
} from "store/reducers/accountSlice";

import Button from "components/button";
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

const Wrapper = styled.div``;

export default function Connect({ space, setShowMenu }) {
  const dispatch = useDispatch();
  const [chain, setChain] = useState(space.networks[0]);
  const [address, setAddress] = useState();
  const availableNetworks = useSelector(availableNetworksSelector);
  const { accounts, hasExtension, extensionAccessible, detecting } =
    useExtension();

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

  return (
    <Wrapper>
      <Closeable
        open={extensionAccessible && accounts.length > 0 && !detecting}
      >
        <StyledText>Chain</StyledText>
        <ChainSelector
          chains={availableNetworks}
          onSelect={(chain) => setChain(chain)}
        />

        <StyledText>Account</StyledText>
        <AccountSelector
          accounts={accounts}
          onSelect={(account) => setAddress(account?.address)}
          chain={chain}
        />

        <ActionBar>
          <Button primary onClick={doConnect}>
            Connect
          </Button>
        </ActionBar>
      </Closeable>

      <NoExtension open={!hasExtension && !detecting} />
      <NoAccount
        open={extensionAccessible && accounts.length === 0 && !detecting}
      />
      <NotAccessible
        open={hasExtension && !extensionAccessible && !detecting}
      />
    </Wrapper>
  );
}
