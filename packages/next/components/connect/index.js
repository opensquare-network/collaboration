import { useState, useEffect, useCallback } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccount,
  availableNetworksSelector,
} from "store/reducers/accountSlice";

import Button from "components/button";
import AccountSelector from "../accountSelector";

import { useIsMounted } from "frontedUtils/hooks";
import styled from "styled-components";
import SvgClose from "public/imgs/icons/close.svg";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import ChainSelector from "@/components/chainSelector";
import {
  ActionBar,
  CloseBar,
  StyledCard,
  StyledModal,
  StyledText,
  StyledTitle,
} from "@/components/connect/styled";
import NotAccessible from "@/components/connect/notAccessible";
import NoExtension from "@/components/connect/noExtension";
import NoAccount from "@/components/connect/noAccount";

const Wrapper = styled.div``;

export default function Connect({ space, setShowMenu }) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [chain, setChain] = useState(space.networks[0]);
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(null);
  const availableNetworks = useSelector(availableNetworksSelector);
  console.log("chain", chain);

  const getAddresses = useCallback(async () => {
    const extensionAccounts = await web3Accounts();
    const accounts = (extensionAccounts || []).map((item) => {
      const {
        address,
        meta: { name },
      } = item;
      return {
        address,
        name,
      };
    });
    if (isMounted.current) {
      setAccounts(accounts);
      setAddress(accounts[0]?.address);
    }
  }, [isMounted]);

  useEffect(() => {
    (async () => {
      await web3Enable("voting");

      if (isMounted.current) {
        setHasExtension(isWeb3Injected);
      }

      if (!isWeb3Injected) {
        return;
      }

      const web3Apps = await web3Enable("voting");
      const polkadotEnabled = web3Apps?.length > 0;
      if (isMounted.current) {
        setIsPolkadotAccessible(polkadotEnabled);
      }
      if (!polkadotEnabled) {
        return;
      }
      getAddresses();
    })();
  }, [isMounted, getAddresses]);

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

  const closeModal = () => dispatch(closeConnect());

  return (
    <Wrapper>
      <StyledModal
        open={isPolkadotAccessible && accounts.length > 0}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>
            <SvgClose onClick={closeModal} />
          </CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

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
        </StyledCard>
      </StyledModal>

      <NoAccount
        open={isPolkadotAccessible && accounts.length === 0}
        closeModal={closeModal}
      />

      <NoExtension open={hasExtension === false} closeModal={closeModal} />

      <NotAccessible
        open={hasExtension && isPolkadotAccessible === false}
        closeModal={closeModal}
      />
    </Wrapper>
  );
}
