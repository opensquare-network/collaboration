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

  const getAddresses = useCallback(async () => {
    if (hasExtension) {
      await web3Enable("voting");
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
  }, [hasExtension, isMounted]);

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
      await web3Enable("voting");
      if (!isWeb3Injected) {
        if (isMounted.current) {
          setHasExtension(false);
        }
      } else {
        getAddresses();
      }
    })();
  }, [isMounted, getAddresses]);

  return (
    <>
      <Modal open={show} dimmer onClose={() => setShow(false)} size="tiny">
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
