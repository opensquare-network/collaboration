import styled from "styled-components";
import { Button as OsnButton } from "@osn/common-ui";
import { css } from "styled-components";

const Button = styled(OsnButton)`
  padding: 12px 24px;
  ${(p) =>
    p.active &&
    css`
      border-color: #6848ff !important;
      color: #6848ff;
    `}
`;

const Content = styled.div`
  position: relative;
  font-weight: 600;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    gap: 8px;
    align-items: center;
  }
  ${(p) => css`
    ::before {
      content: "#${p.index}";
      position: absolute;
      @media screen and (max-width: 800px) {
        position: initial;
      }
      left: 0;
      color: ${p.active ? "#6848ff" : "#a1a8b3"};
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
