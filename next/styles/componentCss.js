import { css } from "styled-components";

export const p_14_medium = css`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`;

export const text_primary = css`
  color: var(--textPrimary);
`;

export const text_accessory = css`
  color: #9da9bb;
`;

export const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
