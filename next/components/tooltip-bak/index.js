import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";

import { newSuccessToast } from "store/reducers/toastSlice";

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

export default function Tooltip({
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
      dispatch(newSuccessToast("Copied"));
    }
  };

  return (
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
  );
}
