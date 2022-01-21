import styled from "styled-components";

import Header from "./header";
import Main from "./main";
// import Toast from "components/toast";
import Footer from "common/components/footer";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ bgHeight, children, space }) {
  return (
    <Wrapper>
      <Header space={space} />
      <Main bgHeight={bgHeight}>{children}</Main>
      <Footer />
      {/* <Toast /> */}
    </Wrapper>
  );
}
