import styled, { css } from "styled-components";

const PopupWrapper = styled.div`
  cursor: auto;
  display: none;
  position: absolute;
  padding-bottom: 10px;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  z-index: 1;
  ${(p) =>
    p.isCopy &&
    css`
      cursor: pointer;
    `}
`;

const Pop = styled.div`
  position: relative;
  background: var(--fillBgPrimary);
  max-width: 320px;
  min-width: ${(p) => (p.noMinWidth ? "none" : "120px")};
  padding: 16px;
  font-size: 12px;
  line-height: 16px;
  color: var(--textPrimaryContrast);
  word-wrap: break-word;
  text-align: left;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--fillBgPrimary);
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const ChildrenWrapper = styled.div`
  position: relative;
  display: flex;
  :hover {
    > * {
      display: flex;
    }
  }
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: var(--textPrimary);
  white-space: nowrap;
`;

export default function Popup({ content, children, title, noMinWidth }) {
  return (
    <ChildrenWrapper>
      {children}
      {content && (
        <PopupWrapper>
          <Pop noMinWidth={noMinWidth} className="shadow-shadowPopup">
            {title && <TitleWrapper>{title}</TitleWrapper>}
            {content}
            <Triangle />
          </Pop>
        </PopupWrapper>
      )}
    </ChildrenWrapper>
  );
}
