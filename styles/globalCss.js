import { css } from "styled-components";

export const shadow_100 = css`
  box-shadow: 0 4px 31px rgba(26, 33, 44, 0.04),
  0 0.751293px 3.88168px rgba(26, 33, 44, 0.03)
`;

export const no_scroll_bar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const text_ellipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export function makeSquare(sideLength) {
  return `width: ${sideLength}px;height: ${sideLength}px;`
}

