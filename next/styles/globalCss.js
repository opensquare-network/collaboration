import { css } from "styled-components";

export const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export function makeSquare(sideLength) {
  return `width: ${sideLength}px;height: ${sideLength}px;`;
}
