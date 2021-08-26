import styled from "styled-components";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Home from "./home";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Home />
      </Main>
      <Footer />
    </Wrapper>
  );
}
