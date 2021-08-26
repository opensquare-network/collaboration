import styled from "styled-components";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
}
