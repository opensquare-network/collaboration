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

export default function Connect({ show, setShow }) {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(true);
  const [addresses, setAddresses] = useState();
  const [address, setAddress] = useState();
  const [isPolkadotAccessible, setIsPolkadotAccessible] = useState(false);

  const getAddresses = useCallback(async () => {
    if (hasExtension) {
      if(!show){
        return ;
      }
      const web3Apps = await web3Enable("voting");
      const polkadotEnabled = (web3Apps.some(web3App => web3App?.name==='polkadot-js'));
      setIsPolkadotAccessible(polkadotEnabled);
      if(!polkadotEnabled){
        //todo: repalce this with a toast
        alert("Cannot access Polkadot, please check installation and permission.");
        return;
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
      if (newWindow) newWindow.openeshowr = null;
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
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if(!show){
        return ;
      }
      const web3Apps = await web3Enable("voting");
      const polkadotEnabled = (web3Apps.some(web3App => web3App?.name==='polkadot-js'));
      setIsPolkadotAccessible(polkadotEnabled);
      if(!polkadotEnabled){
        //todo: repalce this with a toast
        alert("Cannot access Polkadot, please check installation and permission.");
        return;
      }
      if (!isWeb3Injected) {
        if (isMounted.current) {
          setHasExtension(false);
        }
      } else {
        getAddresses();
      }
    })();
  }, [isMounted, getAddresses, show]);

  return (
    <>
      <Modal open={show&& isPolkadotAccessible} dimmer onClose={() => setShow(false)} size="tiny">
        <Modal.Header>Select your address</Modal.Header>
        <Modal.Content>
          <Select
            options={(addresses || []).map((item, index) => ({
              key: index,
              value: item,
              text: item,
            }))}
            value={address}
            onChange={(e, { value }) => setAddress(value)}
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
    </>
  );
}
