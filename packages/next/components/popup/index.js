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
  background: #ffffff;
  max-width: 320px;
  min-width: ${(p) => (p.noMinWidth ? "none" : "120px")};
  padding: 16px;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  word-wrap: break-word;
  text-align: left;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #ffffff;
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
  filter: drop-shadow(0px 4px 31px rgba(26, 33, 44, 0.06))
    drop-shadow(0px 0.751293px 8px rgba(26, 33, 44, 0.04));
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  white-space: nowrap;
`;

export default function Popup({ content, children, title, noMinWidth }) {
  return (
    <ChildrenWrapper>
      {children}
      {content && (
        <PopupWrapper>
          <Pop noMinWidth={noMinWidth}>
            {title && <TitleWrapper>{title}</TitleWrapper>}
            {content}
            <Triangle />
          </Pop>
        </PopupWrapper>
      )}
    </ChildrenWrapper>
  );
}
