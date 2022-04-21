import styled from "styled-components";
import Button from "@osn/common-ui/dist/styled/Button";
import { p_14_medium } from "../styles/textStyles";
import { css } from "styled-components";

const Option = styled(Button)`
  display: block;
  border: 1px solid #e2e8f0;
  padding: 12px 24px;
  text-align: center;
  position: relative;
  ${p_14_medium};
  cursor: pointer;
  :hover {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.active &&
    css`
      border-color: #6848ff !important;
      color: #6848ff;
      .index {
        color: #6848ff !important;
      }
    `}
  .index {
    position: absolute;
    left: 24px;
    top: calc(50% - 12px);
    ${p_14_medium};
    color: #a1a8b3;
  }
  .option {
    margin-left: 47px;
    margin-right: 47px;
  }
  ${(p) =>
    p.disabled &&
    css`
      background: none;
      pointer-events: none;
    `}
`;

export default Option;
