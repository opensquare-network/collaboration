import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import nextApi from "services/nextApi";
import { loginNetworkSelector } from "store/reducers/accountSlice";
import useMaybeProxyAddress from "./useMaybeProxyAddress";

export function useIsSocietyMember() {
  const network = useSelector(loginNetworkSelector);
  const address = useMaybeProxyAddress();
  const [isSocietyMember, setIsSocietyMember] = useState(false);
  useEffect(() => {
    if (!address || !network) {
      return;
    }
    nextApi
      .fetch(`${network.network}/society/members/${address}`)
      .then(({ result }) => {
        setIsSocietyMember(result?.data !== null);
      });
  }, [network, address]);

  return isSocietyMember;
}
