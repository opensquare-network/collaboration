import styled from "styled-components";
import { p_14_medium } from "../styles/textStyles";
import { Flex, FlexBetween } from "@osn/common-ui";

const Header = styled.div`
  ${p_14_medium};
  color: var(--textSecondary);
  flex-shrink: 1;
  white-space: nowrap;
`;
const Content = styled(Flex)`
  width: 100%;
  flex-grow: 1;
  ${p_14_medium};
  color: var(--textPrimary);
  justify-content: right;
`;

export default function Row({ header, content }) {
  return (
    <FlexBetween>
      <Header>{header}</Header>
      <Content>{content}</Content>
    </FlexBetween>
  );
}
