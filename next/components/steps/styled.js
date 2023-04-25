import styled, { css } from "styled-components";

export const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  border: 2px solid #b7c0cc;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #a1a8b3;
`;

export const NavigationLine = styled.div`
  flex-grow: 1;
  min-width: 30px;
  height: 0px;

  border: 2px solid #04d2c5;

  ${({ isHidden }) =>
    isHidden &&
    css`
      border-color: rgba(0, 0, 0, 0);
    `}
`;
