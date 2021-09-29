import { useState, useEffect, useCallback } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useDispatch } from "react-redux";
import { setAccount } from "store/reducers/accountSlice";
import { Modal, Select, Button } from "semantic-ui-react";

import { useIsMounted } from "utils/hooks";
import styled from "styled-components";
import { p_20_semibold } from "../styles/textStyles";

const Wrapper = styled.div`
  
`
const ModalHeader = styled.h1`
  ${p_20_semibold};
  margin-top: 24px !important;
`

const GotoPolkadotButton = styled(Button)`
  display: block !important;
  margin-left: auto !important;
  margin-bottom: 32px !important;
  margin-right: 32px !important;
`

export default function Connect({show, setShow}) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(true);
  const [addresses, setAddresses] = useState();
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(true);

  const getAddresses = useCallback(async () => {
    if (hasExtension) {
      if(!show){
        return ;
      }
      const extensionAccounts = await web3Accounts();
      const addresses = (extensionAccounts || []).map((item) => item.address);
      if (isMounted.current) {
        setAddresses(addresses);
        setAddress(addresses[0]);
      }
    } else {
      const newWindow = window.open(
        "https://polkadot.js.org/extension/",
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
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
      const polkadotEnabled = (web3Apps.some(web3App => web3App?.name === 'polkadot-js'));
      setIsPolkadotAccessible(polkadotEnabled);
      if (!polkadotEnabled) {
        return;
      }
      getAddresses();
    })();
  }, [isMounted, getAddresses, show]);

  return (
    <Wrapper>
      <Modal open={show && isPolkadotAccessible} dimmer onClose={() => setShow(false)} size="tiny">
        <Modal.Header>Select your address</Modal.Header>
        <Modal.Content>
          <Select
            options={(addresses || []).map((item, index) => ({
              key: index,
              value: item,
              text: item,
            }))}
            value={address}
            onChange={(e, {value}) => setAddress(value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button positive onClick={getConnection}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        open={!hasExtension}
        // dimmer
        closeIcon
        onClose={() => {
        }}
        size="mini"
      >
        <Modal.Header>
          <ModalHeader>
            Connect Wallet
          </ModalHeader>
        </Modal.Header>
        <Modal.Content>
          Polkadot-js extension not detected. No web3 account could be found. Visit this page on a computer with
          polkadot-js extension.
        </Modal.Content>
        <GotoPolkadotButton color="orange" onClick={() => setShow(false)}>
          Polkadot{`{.js}`} Extension
        </GotoPolkadotButton>
      </Modal>

      <Modal
        open={hasExtension && !isPolkadotAccessible}
        closeIcon
        onClose={() => {
        }}
        size="mini"
      >
        <Modal.Header>
          <ModalHeader>
            Connect Wallet
          </ModalHeader>
        </Modal.Header>
        <Modal.Content>
          Polkadot-js extension is detected. But not accessible, please go to your broswer extensions and find Polkadot-js, and check permissions.
        </Modal.Content>
        <GotoPolkadotButton color="orange" onClick={() => setShow(false)}>
          How to allow access?
        </GotoPolkadotButton>
      </Modal>
    </Wrapper>
  );
}
