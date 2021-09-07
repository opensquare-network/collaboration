import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  isWeb3Injected,
  web3Accounts,
  web3Enable,
} from "@polkadot/extension-dapp";

import { useIsMounted } from "utils/hooks";
import { signMessage } from "services/chainApi";
import nextApi from "services/nextApi";

const Button = styled.div`
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #191e27;
  cursor: pointer;
`;

export default function Connect() {
  const isMounted = useIsMounted();
  const [hasExtension, setHasExtension] = useState(true);

  const onClick = async () => {
    if (hasExtension) {
      await web3Enable("voting");
      const extensionAccounts = await web3Accounts();
      const address = extensionAccounts?.[0]?.address;
      if (address) {
        const { result, error } = await nextApi.fetch(
          `auth/connect/${address}`
        );
        if (result) {
          const signature = await signMessage(result?.challenge, address);
          console.log({ signature });
          const { error: confirmError, result: confirmResult } =
            await nextApi.post(`auth/connect/${result?.attemptId}`, {
              challengeAnswer: signature,
            });
          if (confirmResult) {
            console.log("connect successfully!");
          }
          if (confirmError) {
            console.log(error.message);
          }
        }
        if (error) {
          console.log(error.message);
        }
      }
    } else {
      const newWindow = window.open(
        "https://polkadot.js.org/extension/",
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    }
  };

  useEffect(() => {
    (async () => {
      await web3Enable("voting");
      if (!isWeb3Injected && isMounted.current) {
        setHasExtension(false);
      }
    })();
  }, [isMounted]);

  return <Button onClick={onClick}>Connect Wallet</Button>;
}
