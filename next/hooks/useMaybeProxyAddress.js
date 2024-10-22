import { useSelector } from "react-redux";
import {
  loginAddressSelector,
  proxySelector,
  useProxySelector,
} from "store/reducers/accountSlice";

export default function useMaybeProxyAddress() {
  const loginAddress = useSelector(loginAddressSelector);
  const proxyAddress = useSelector(proxySelector);
  const useProxy = useSelector(useProxySelector);
  return useProxy ? proxyAddress : loginAddress;
}
