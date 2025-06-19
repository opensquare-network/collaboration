import styled from "styled-components";
import { useSelector } from "react-redux";

import ToastItem from "./toastItem";
import { toastsSelector } from "store/reducers/toastSlice";

const Wrapper = styled.div`
  position: fixed;
  height: 0;
  right: 80px;
  top: 80px;
  z-index: 999;
  pointer-events: none;
  @media screen and (max-width: 500px) {
    top: 40px;
    right: 0;
    left: 0;
    padding: 0 20px;
  }
`;

const ToastList = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column-reverse;
  > :not(:last-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Toast = () => {
  const toasts = useSelector(toastsSelector);

  return (
    <Wrapper>
      <ToastList>
        {(toasts || []).map(({ type, message, id, sticky }) => (
          <ToastItem
            type={type}
            message={message}
            id={id}
            key={id}
            sticky={sticky}
          />
        ))}
      </ToastList>
    </Wrapper>
  );
};

export default Toast;
