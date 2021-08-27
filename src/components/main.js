import styled from "styled-components";

const Wrapper = styled.main`
  position: relative;
  flex-grow: 1;
  padding: 40px 0;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${(p) => p.bgHeight};
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

const ChildrenWrapper = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
`;

export default function Main({ bgHeight, children }) {
  return (
    <Wrapper>
      <Background bgHeight={bgHeight} />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
}
