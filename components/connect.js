import { useState, useEffect, useCallback } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useDispatch } from "react-redux";
import { setAccount } from "store/reducers/accountSlice";
import { Modal, Image, Button } from "semantic-ui-react";
import AccountSelector from "./accountSelector";

import { useIsMounted } from "utils/hooks";
import styled from "styled-components";
import { p_20_semibold } from "../styles/textStyles";
import SvgClose from "public/imgs/icons/close.svg";

const Wrapper = styled.div`

`
const ModalHeader = styled.h1`
  ${p_20_semibold};
  margin-top: 24px !important;
`

const GotoPolkadotButton = styled(Button)`
  &.ui.button:hover,
  &.ui.button:active,
  &.ui.button:focus {
    background: #E37F06 !important;
  }
  padding: 8px 16px;
  border: 0;
  outline: none;
  cursor: pointer;

  background: #E37F06 !important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;

  border-radius: 0px !important;

`

const StyledModal = styled(Modal)`
  max-width: 400px !important;
  border-radius: 0px !important;
`;

const StyledCard = styled.div`
  margin: 0 !important;
  padding: 32px !important;
  position: relative !important;
  width: 100% !important;
`;

const StyledTitle = styled.header`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #1E2134;
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1E2134;
`;

const StyledDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #506176;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  > svg path {
    fill: #9DA9BB;
  }
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
`;

const StyledButtonPrimary = styled.button`
  &.ui.button:hover,
  &.ui.button:active,
  &.ui.button:focus {
    background: #191E27 !important;
  }
  padding: 8px 16px;
  border: 0;
  outline: none;
  cursor: pointer;

  background: #191E27 !important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #FFFFFF;

  border-radius: 0px !important;

`;

export default function Connect({show, setShow}) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(true);

  const getAddresses = useCallback(async () => {
    if (hasExtension) {
      if(!show){
        return ;
      }
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
        setAddress(accounts[0].address);
      }
    }
  }, [hasExtension, isMounted, show]);

  const getConnection = async () => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + oneWeek).toISOString();
    try {
      dispatch(
        setAccount({
          expires,
          address,
        })
      );
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (!show) {
        return;
      }
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
  }, [isMounted, getAddresses, show]);

  const closeModal = () => setShow(false);

  return (
    <Wrapper>
      <StyledModal open={show && hasExtension && isPolkadotAccessible} dimmer onClose={closeModal} size="tiny">
        <StyledCard>
          <CloseBar>
            <SvgClose onClick={closeModal} />
          </CloseBar>
          <StyledTitle>Connect Wallet</StyledTitle>
          <StyledText>Account</StyledText>

          <AccountSelector
            accounts={accounts}
            onSelect={
              (account) => setAddress(account?.address)
            }
          />

          <ActionBar>
            <StyledButtonPrimary
              onClick={getConnection}
            >
              Connect
            </StyledButtonPrimary>
          </ActionBar>
        </StyledCard>
      </StyledModal>

      <StyledModal
        open={show && !hasExtension}
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
            Polkadot-js extension not detected. No web3 account could be found. Visit this page on a computer with
            polkadot-js extension.
          </StyledDescription>

          <ActionBar>
            <GotoPolkadotButton color="orange" onClick={() => {
              closeModal();
              const newWindow = window.open(
                "https://polkadot.js.org/extension/",
                "_blank",
                "noopener,noreferrer"
              );
              if (newWindow) newWindow.opener = null;
            }}>
              Polkadot{`{.js}`} Extension
            </GotoPolkadotButton>
          </ActionBar>

        </StyledCard>

      </StyledModal>

      <StyledModal
        open={show && hasExtension && !isPolkadotAccessible}
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
          Polkadot-js extension is detected. But not accessible, please go to your broswer extensions and find Polkadot-js, and check permissions.
          </StyledDescription>

          <ActionBar>
            <GotoPolkadotButton color="orange" onClick={() => {
              closeModal();
              const newWindow = window.open(
                "https://polkadot.js.org/extension/",
                "_blank",
                "noopener,noreferrer"
              );
              if (newWindow) newWindow.opener = null;
            }}>
              How to allow access?
            </GotoPolkadotButton>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
