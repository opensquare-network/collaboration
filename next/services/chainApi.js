import {
  web3Enable,
  isWeb3Injected,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";
import { ethers } from "ethers";

async function singByMetaMask(text, address) {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    throw new Error("No MetaMask detected");
  }

  const hex = stringToHex(text);
  return await window.ethereum.request({
    method: "personal_sign",
    params: [hex, address],
  });
}

export const signMessage = async (text, address) => {
  if (ethers.utils.isAddress(address)) {
    return singByMetaMask(text, address);
  }

  if (!isWeb3Injected) {
    throw new Error("Polkadot Extension is not installed");
  }

  if (!address) {
    throw new Error("Sign addres is missing");
  }

  await web3Enable("opensquare.io");
  const injector = await web3FromAddress(address);

  const data = stringToHex(text);
  const result = await injector.signer.signRaw({
    type: "bytes",
    data,
    address,
  });

  return result.signature;
};

export const signApiData = async (data, address) => {
  const dataToSign = {
    ...data,
    timestamp: parseInt(Date.now() / 1000),
  };
  const msg = JSON.stringify(dataToSign);
  const signature = await signMessage(msg, address);

  return {
    data: dataToSign,
    address,
    signature,
  };
};
