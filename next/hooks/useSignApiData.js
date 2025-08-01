import useInjectedExtension from "@/components/connect/wallets/useInjectedExtension";
import { stringToHex } from "@polkadot/util";
import { appName } from "frontedUtils/consts/app";
import { evmChains } from "frontedUtils/consts/chains";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { useSignMessage } from "wagmi";

function useSubstrateSignMessage(extensionName) {
  const { injectedExtension } = useInjectedExtension(extensionName);
  return useCallback(
    async (message, address) => {
      if (!injectedExtension) {
        throw new Error("Injected extension not found");
      }

      const injector = await injectedExtension.enable(appName);
      if (!injector) {
        throw new Error("Enable injector extension failed");
      }

      const data = stringToHex(message);
      const result = await injector.signer.signRaw({
        type: "bytes",
        data,
        address,
      });

      return result.signature;
    },
    [injectedExtension],
  );
}

function useEvmSignMessage() {
  const { signMessage } = useSignMessage();
  return useCallback(
    (message, address) =>
      new Promise((resolve, reject) => {
        signMessage(
          { account: address, message },
          { onSuccess: resolve, onError: reject },
        );
      }),
    [signMessage],
  );
}

export function useRawSignData() {
  const account = useSelector(accountSelector);
  const substrateSignMessage = useSubstrateSignMessage(account?.wallet);
  const evmSignMessage = useEvmSignMessage(account?.wallet);

  return useCallback(
    async (data) => {
      const msg = JSON.stringify(data);
      const isEvmChain = evmChains.includes(account?.network);
      let signature;
      if (isEvmChain) {
        signature = await evmSignMessage(msg, account?.address);
      } else {
        signature = await substrateSignMessage(msg, account?.address);
      }

      return {
        data,
        address: account?.address,
        signature,
      };
    },
    [account, evmSignMessage, substrateSignMessage],
  );
}

export default function useSignApiData() {
  const signData = useRawSignData();
  return useCallback(
    async (data) => {
      const dataToSign = {
        ...data,
        timestamp: parseInt(Date.now() / 1000),
      };
      return signData(dataToSign);
    },
    [signData],
  );
}
