import styled from "styled-components";
import { p_14_normal } from "../styles/textStyles";

const styledInput = styled.input`
  all: unset;
  padding: 12px 16px;
  background: var(--fillBgSecondary);
  border-bottom: 1px solid var(--strokeActionDefault);
  :hover,
  :focus,
  :active {
    border-color: var(--strokeActionActive);
  }
  ${p_14_normal};
  display: block;
  color: var(--textPrimary);
  ::placeholder {
    color: var(--textTertiary);
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default styledInput;
