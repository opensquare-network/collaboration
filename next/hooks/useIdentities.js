import { getChainConfigs } from "../frontedUtils/consts/chains";
import { fetchIdentity } from "services/identity";
import { useCallback, useEffect, useState } from "react";
import encodeAddressByChain from "frontedUtils/chain/addr";

export default function useIdentities(network, addresses) {
  const [identities, setIdentities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOne = useCallback(async (network, address) => {
    const chainConfig = getChainConfigs(network);
    const identityNetwork = chainConfig?.identity || network;
    const identityAddr = encodeAddressByChain(address, identityNetwork);
    return await fetchIdentity(identityNetwork, identityAddr);
  }, []);

  useEffect(() => {
    if (!addresses || !network) {
      return;
    }

    setIsLoading(true);
    Promise.all(addresses.map((addr) => fetchOne(network, addr)))
      .then((identities) => {
        setIdentities(identities);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchOne, addresses, network]);

  return { identities, isLoading };
}
