import { useState, useEffect } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";
import { useIsMountedBool } from "./index";
import { appName } from "../consts/app";
import { ethers } from "ethers";

export default function useExtension() {
  const isMounted = useIsMountedBool();
  const [hasExtension, setHasExtension] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [extensionAccessible, setExtensionAccessible] = useState(false);
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    (async () => {
      const web3Apps = await web3Enable(appName);
      setHasExtension(isWeb3Injected);
      if (!isWeb3Injected) {
        setDetecting(false);
        return;
      }

      const accessEnabled = web3Apps?.length > 0;
      if (isMounted) {
        setExtensionAccessible(accessEnabled);
      }
      if (!accessEnabled) {
        if (isMounted) {
          setDetecting(false);
        }
        return;
      }

      const extensionAccounts = await web3Accounts();
      // Currently we don't support sign in ethereum address with polkadot extension
      const filteredAccounts = extensionAccounts.filter(
        ({ address }) => !ethers.utils.isAddress(address)
      );

      if (isMounted) {
        setAccounts(filteredAccounts);
        setDetecting(false);
      }
    })();
  }, [isMounted]);

  return {
    accounts,
    hasExtension,
    extensionAccessible,
    detecting,
  };
}
