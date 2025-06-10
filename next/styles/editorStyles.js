import { css } from "styled-components";

export const code_block_base = css`
  background-color: var(--fillBgSecondary) !important;
  color: var(--textPrimary) !important;
  border: 1px solid var(--strokeBorderDefault) !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace !important;
`;

export const code_block_pre = css`
  ${code_block_base}
  border-radius: 8px !important;
  padding: 16px !important;
  margin: 16px 0 !important;
  overflow-x: auto !important;
  font-size: 0.875em !important;
  line-height: 1.5 !important;
`;

export const code_inline = css`
  ${code_block_base}
  border-radius: 4px !important;
  padding: 2px 6px !important;
  font-size: 0.875em !important;
  vertical-align: baseline !important;
`;

export const code_pre_reset = css`
  background: none !important;
  border: none !important;
  padding: 0 !important;
  color: inherit !important;
`;


export const skeleton_animation = css`
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite ease-in-out;

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const skeleton_gradient_dark = css`
  background: linear-gradient(
    90deg,
    var(--fillBgTertiary) 0%,
    var(--neutralGray900) 49.5%,
    var(--fillBgTertiary) 100%
  );
  ${skeleton_animation}
`;

export const skeleton_gradient_light = css`
  background: linear-gradient(
    270deg,
    var(--fillBgTertiary) 0%,
    var(--neutralGray50) 50%,
    var(--fillBgTertiary) 100%
  );
  ${skeleton_animation}
`;