import styled from "styled-components";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Toast from "components/toast";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ bgHeight, children, network }) {
  return (
    <Wrapper>
      <Header network={network} />
      <Main bgHeight={bgHeight}>{children}</Main>
      <Footer />
      <Toast />
    </Wrapper>
  );
}
