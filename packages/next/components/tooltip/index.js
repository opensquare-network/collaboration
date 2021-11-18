import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";

import { addToast } from "store/reducers/toastSlice";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  font-size: 14px;
  line-height: 16px;
  color: rgba(17, 17, 17, 0.65);
  > svg {
    stroke-opacity: 0.65;
  }
  :hover {
    color: #111111;
    > svg {
      stroke-opacity: 1;
    }
    > * {
      display: block;
    }
  }
  ${(p) =>
    p.bg &&
    css`
      padding: 6px 12px;
      background: #f4f4f4;
      border-radius: 4px;
      :hover {
        background: #eeeeee;
      }
    `}
`;

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

const Popup = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  max-width: 257px;
  min-width: ${(p) => (p.noMinWidth ? "none" : "120px")};
  padding: 6px 12px;
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
  border-top: 6px solid rgba(0, 0, 0, 0.65);
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const ChildrenWrapper = styled.div`
  color: red;
  position: relative;
  display: inline-block;
  :hover {
    > * {
      display: block;
    }
  }
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  white-space: nowrap;
`;

const TooltipIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export default function Tooltip({
  label,
  bg,
  content,
  children,
  isCopy,
  copyText,
  title,
  noMinWidth,
}) {
  const dispatch = useDispatch();

  const onCopy = () => {
    if (isCopy && content && copy(copyText || content)) {
      dispatch(addToast({ type: "success", message: "Copied" }));
    }
  };

  return (
    <>
      {children ? (
        <ChildrenWrapper>
          {children}
          {content && (
            <PopupWrapper onClick={onCopy} isCopy>
              <Popup noMinWidth={noMinWidth}>
                {title && <TitleWrapper>{title}</TitleWrapper>}
                {content}
                <Triangle />
              </Popup>
            </PopupWrapper>
          )}
        </ChildrenWrapper>
      ) : (
        <Wrapper bg={bg}>
          {label && label}
          {!label && <TooltipIcon src="/imgs/icons/tooltip-icon.svg" />}
          {content && (
            <PopupWrapper onClick={onCopy} isCopy>
              <Popup noMinWidth={noMinWidth}>
                {title && <TitleWrapper>{title}</TitleWrapper>}
                {content}
                <Triangle />
              </Popup>
            </PopupWrapper>
          )}
        </Wrapper>
      )}
    </>
  );
}
