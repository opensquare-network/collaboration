import { evmChains, getChainConfigs } from "../frontedUtils/consts/chains";
import { fetchIdentity } from "services/identity";
import { useEffect, useState } from "react";
import encodeAddressByChain from "frontedUtils/chain/addr";

export default function useIdentity(network, address) {
  const [identity, setIdentity] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isEvm = evmChains.includes(network);

  useEffect(() => {
    if (!address || !network || isEvm) {
      return;
    }

    const chainConfig = getChainConfigs(network);
    const identityNetwork = chainConfig?.identity || network;
    const identityAddr = encodeAddressByChain(address, identityNetwork);

    setIsLoading(true);
    fetchIdentity(identityNetwork, identityAddr)
      .then((identity) => {
        setIdentity(identity);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [network, address, isEvm]);

  return { identity, isLoading };
}
