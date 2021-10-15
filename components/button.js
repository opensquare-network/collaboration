import styled, { css } from "styled-components";
import { p_14_medium } from "../styles/textStyles";

const Wrapper = styled.div`
  ${p_14_medium};
  text-align: center;
  padding: 7px 15px;
  border: 1px solid #b7c0cc;
  cursor: pointer;
  color: #1e2134;
  &:hover{
    border-color: #404753;
  }
  ${(p) =>
    p.primary &&
    css`
      padding: 8px 16px;
      border: none;
      color: #ffffff;
      background: #191e27;
      &:hover{
        background: #404753;
      }
    `}
  ${(p) =>
          p.large &&
          css`
      padding: 12px 16px;
    `}
  ${(p) =>
          (p.isLoading || p.disabled) &&
          css`
      background: #e2e8f0;
      pointer-events: none;
    `}
  ${(p) =>
          (p.isLoading) &&
          css`
      cursor: wait;
    `}
  ${(p) =>
          (p.disabled) &&
          css`
      cursor: not-allowed;
    `}
`;

export default function Button({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}
