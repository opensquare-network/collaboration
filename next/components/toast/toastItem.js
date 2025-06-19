import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import { removeToast } from "store/reducers/toastSlice";
import { ReactComponent as Close } from "public/imgs/icons/close.svg";
import { ReactComponent as Sticky } from "public/imgs/icons/sticky.svg";
import { TOAST_TYPES } from "frontedUtils/constants";
import { cn } from "@osn/common-ui";

const Wrapper = styled.div`
  pointer-events: initial;
  padding: 20px;
  width: 400px;
  background: var(--fillBgPrimary);
  color: var(--textSecondary);
  display: flex;
  align-items: flex-start;
  border-left: 4px solid var(--strokeActionDefault);
  ${(p) =>
    p.color &&
    css`
      border-left-color: ${p.color};
    `}
  @media screen and (max-width: 500px) {
    width: auto;
  }
`;

const LeftWrapper = styled.div`
  flex: 1 1 auto;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: var(--textSecondary);
  word-wrap: break-word;
  word-break: break-all;
`;

const RightWrapper = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
  > svg {
    path {
      fill: var(--textTertiary);
    }
    fill: var(--textTertiary);
    :hover {
      fill: var(--textPrimary);
      path {
        fill: var(--textPrimary);
      }
    }
  }
`;

const getToastColor = (type) => {
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      return "var(--textFeedbackSuccess)";
    case TOAST_TYPES.ERROR:
      return "var(--textFeedbackError)";
    case TOAST_TYPES.INFO:
    case TOAST_TYPES.PENDING:
      return "var(--fillBgBrandPrimary)";
    default:
      return "var(--textTertiary)";
  }
};

const ToastItem = ({ type, message, id, sticky }) => {
  const dispatch = useDispatch();
  const color = getToastColor(type);

  useEffect(() => {
    if (sticky) {
      return;
    }
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 5000);
  }, [dispatch, id, sticky]);

  if (!message) return null;
  return (
    <Wrapper color={color} className={cn("shadow-shadowPopup")}>
      <LeftWrapper>
        <Title>{type}</Title>
        <Content>{message}</Content>
      </LeftWrapper>
      <RightWrapper>
        {sticky ? (
          <Sticky />
        ) : (
          <Close onClick={() => dispatch(removeToast(id))} />
        )}
      </RightWrapper>
    </Wrapper>
  );
};

export default ToastItem;
