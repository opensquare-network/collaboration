import styled from "styled-components";
import { p_14_medium } from "../styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = styled.div`
  ${p_14_medium};
  color: #506176;
`
const Content = styled.div`
  ${p_14_medium};
  color: #1e2134;
`

export default function Row({header, content}) {
  return <Wrapper>
    <Header>{header}</Header>
    <Content>{content}</Content>
  </Wrapper>
}
