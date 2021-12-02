import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";

import { addToast } from "store/reducers/toastSlice";
import { p_14_normal } from "../styles/textStyles";

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
  background: rgba(25, 30, 39, 0.9);
  white-space: nowrap;
  padding: 8px 12px;
  ${p_14_normal};
  color: #ffffff;
  word-wrap: break-word;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(25, 30, 39, 0.9);
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  display: inline-block;
  :hover {
    > * {
      display: block;
    }
  }
  > svg {
    display: block;
  }
  ${(p) =>
    p.size === "full" &&
    css`
      width: 100%;
      height: 100%;
    `}
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
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
  size,
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
        <ChildrenWrapper size={size}>
          {children}
          {content && (
            <PopupWrapper onClick={onCopy} isCopy={isCopy}>
              <Popup>
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
              <Popup>
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
