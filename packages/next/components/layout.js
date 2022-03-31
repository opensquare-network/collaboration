import styled from "styled-components";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Toast from "components/toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  metamaskAddrSelector,
  metamaskChainIdSelector,
  setMetaMaskAddress,
  setMetaMaskChainId,
} from "../store/reducers/metamaskSlice";
import {
  isEvmSelector,
  loginAccountSelector,
  loginNetworkSelector,
  logout,
} from "../store/reducers/accountSlice";
import { evmChainId } from "../frontedUtils/consts/chains";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ bgHeight, children, space }) {
  const dispatch = useDispatch();
  const metamaskChainId = useSelector(metamaskChainIdSelector);
  const metamaskAddr = useSelector(metamaskAddrSelector);
  const isEvm = useSelector(isEvmSelector);
  const { address: loginAddress, network: loginNetwork } =
    useSelector(loginAccountSelector) || {};

  function setChainId(chainId) {
    dispatch(setMetaMaskChainId(chainId));
  }

  useEffect(() => {
    if (isEvm && metamaskAddr !== loginAddress) {
      dispatch(logout());
    }
  }, [dispatch, isEvm, metamaskAddr, loginAddress]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    window.ethereum.request({ method: "eth_chainId" }).then(setChainId);
    window.ethereum.on("chainChanged", (chainId) => {
      if (isEvm && evmChainId[loginNetwork] !== parseInt(chainId)) {
        dispatch(logout());
      }

      if (chainId !== metamaskChainId) {
        setChainId(chainId);
      }
    });

    const intervalId = setInterval(() => {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          const firstAccount = accounts[0];
          if (metamaskAddr !== firstAccount) {
            dispatch(setMetaMaskAddress(firstAccount));
          }
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [metamaskAddr, metamaskChainId, isEvm, evmChainId, loginNetwork]);

  return (
    <Wrapper>
      <Header space={space} />
      <Main bgHeight={bgHeight}>{children}</Main>
      <Footer />
      <Toast />
    </Wrapper>
  );
}
