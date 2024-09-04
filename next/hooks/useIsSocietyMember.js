import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import nextApi from "services/nextApi";
import {
  loginAddressSelector,
  loginNetworkSelector,
} from "store/reducers/accountSlice";

export function useIsSocietyMember() {
  const network = useSelector(loginNetworkSelector);
  const loginAddress = useSelector(loginAddressSelector);
  const [isSocietyMember, setIsSocietyMember] = useState(false);
  useEffect(() => {
    if (!loginAddress || !network) {
      return;
    }
    nextApi
      .fetch(`${network.network}/society/members/${loginAddress}`)
      .then(({ result }) => {
        setIsSocietyMember(result?.data !== null);
      });
  }, [network, loginAddress]);

  return isSocietyMember;
}
