import styled from "styled-components";

const Wrapper = styled.main`
  position: relative;
  flex-grow: 1;
  padding: 40px 0;
`;

const Bg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 183px;
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
`;

const ChildrenWrapper = styled.div`
  position: relative;
`;

export default function Main({ children }) {
  return (
    <Wrapper>
      <Bg />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
}
