import styled, { ThemeProvider } from "styled-components";

import Header from "./header";
import Main from "./main";
import { Footer } from "@osn/common-ui";
import Toast from "components/toast";
import Shade from "components/shade";
import theme from "../styles/theme";
import { useEffect } from "react";
import { initAccount } from "store/reducers/accountSlice";
import { useDispatch } from "react-redux";
import NotificationMonitor from "./notification/monitor";
import WagmiProvider from "context/wagmi";
import ReactQueryClientProvider from "context/reactQuery";

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ bgHeight, children, networks }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <WagmiProvider>
        <ReactQueryClientProvider>
          <Wrapper>
            <Header networks={networks} />
            <Main bgHeight={bgHeight}>{children}</Main>
            <Footer github="https://github.com/opensquare-network/collaboration/" />
            <Toast />
            <Shade />
            <NotificationMonitor />
          </Wrapper>
        </ReactQueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
