import styled from "styled-components";
import { p_14_medium } from "../styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  ${p_14_medium};
  color: #506176;
  flex-shrink: 1;
  white-space: nowrap;
`;
const Content = styled.div`
  width: 100%;
  flex-grow: 1;
  ${p_14_medium};
  color: #1e2134;
  display: flex;
  justify-content: right;
`;

export default function Row({ header, content }) {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Content>{content}</Content>
    </Wrapper>
  );
}
