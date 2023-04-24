import styled from "styled-components";
import { Button as OsnButton, Flex } from "@osn/common-ui";
import { css } from "styled-components";
import { p_14_medium } from "@osn/common-ui/es/styles/textStyles";
import {
  primary_purple_500,
  text_dark_accessory,
} from "@osn/common-ui/es/styles/colors";

const Button = styled(OsnButton)`
  padding: 12px 24px;
  ${(p) =>
    p.active &&
    css`
      border-color: ${primary_purple_500} !important;
      color: ${primary_purple_500};
    `}
`;

const Content = styled(Flex)`
  flex-grow: 1;
  ${p_14_medium};
  position: relative;
  justify-content: center;
  padding: 0 48px;
  ${(p) => css`
    ::before {
      position: absolute;
      left: 0;
      content: "#${p.index}";
      color: ${p.active ? primary_purple_500 : text_dark_accessory};
    }
  `}
`;

function Option({ children, index, active, ...props }) {
  return (
    <Button block active={active} {...props}>
      <Content active={active} index={index}>
        {children}
      </Content>
    </Button>
  );
}

export default Option;
