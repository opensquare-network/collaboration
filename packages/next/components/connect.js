import { useState, useEffect, useCallback } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useDispatch } from "react-redux";
import { setAccount } from "store/reducers/accountSlice";
import { Modal } from "semantic-ui-react";
import Button from "components/button";
import AccountSelector from "./accountSelector";

import { useIsMounted } from "frontedUtils/hooks";
import styled from "styled-components";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "../styles/textStyles";
import SvgClose from "public/imgs/icons/close.svg";
import { closeConnect } from "../store/reducers/showConnectSlice";

const Wrapper = styled.div``;

const StyledModal = styled(Modal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

const StyledCard = styled.div`
  margin: 0 !important;
  padding: 24px !important;
  position: relative !important;
  width: 100% !important;
`;

const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
`;

const StyledDescription = styled.p`
  ${p_14_normal};
  color: #506176;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
`;

export default function Connect({ setShowMenu }) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(null);

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
      if (!isWeb3Injected) {
        if (isMounted.current) {
          return setHasExtension(false);
        }
      }
      const web3Apps = await web3Enable("voting");
      const polkadotEnabled = web3Apps?.length > 0;
      setIsPolkadotAccessible(polkadotEnabled);
      if (!polkadotEnabled) {
        return;
      }
      getAddresses();
    })();
  }, [isMounted, getAddresses]);

  const getConnection = async () => {
    try {
      dispatch(setAccount(address));
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
          <StyledText>Account</StyledText>

          <AccountSelector
            accounts={accounts}
            onSelect={(account) => setAddress(account?.address)}
          />

          <ActionBar>
            <Button primary onClick={getConnection}>
              Connect
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={isPolkadotAccessible && accounts.length === 0}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>
            <SvgClose onClick={closeModal} />
          </CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension is connected, but no account found. Please
            create or import some accounts first.
          </StyledDescription>

          <ActionBar>
            <Button
              color="orange"
              onClick={() => {
                closeModal();
                const newWindow = window.open(
                  "https://polkadot.js.org/extension/",
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }}
            >
              Create/Import addresses
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={hasExtension === false}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>
            <SvgClose onClick={closeModal} />
          </CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension not detected. No web3 account could be found.
            Visit this page on a computer with polkadot-js extension.
          </StyledDescription>

          <ActionBar>
            <Button
              color="orange"
              onClick={() => {
                closeModal();
                const newWindow = window.open(
                  "https://polkadot.js.org/extension/",
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }}
            >
              Polkadot{`{.js}`} Extension
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={hasExtension && isPolkadotAccessible === false}
        dimmer
        onClose={closeModal}
        size="tiny"
      >
        <StyledCard>
          <CloseBar>
            <SvgClose onClick={closeModal} />
          </CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>

          <StyledDescription>
            Polkadot-js extension is detected but unaccessible, please go to
            Polkadot-js extension, settings, and check Manage Website Access
            section.
          </StyledDescription>

          <ActionBar>
            <Button color="orange" onClick={closeModal}>
              Got it.
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
