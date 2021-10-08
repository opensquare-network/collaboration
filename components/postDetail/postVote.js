import styled, { css } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { p_16_semibold } from "styles/textStyles";
import Input from "components/input";
import { useViewfunc, useSpace } from "utils/hooks";
import { accountSelector } from "store/reducers/accountSlice";
import { addToast } from "store/reducers/toastSlice";
import { TOAST_TYPES } from "utils/constants";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ButtonsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Button = styled.div`
  border: 1px solid #e2e8f0;
  padding: 12px 24px;
  text-align: center;
  position: relative;
  ${p_16_semibold};
  cursor: pointer;
  :hover {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.active &&
    css`
      border-color: #6848ff !important;
      color: #6848ff;
      .index {
        color: #6848ff !important;
      }
    `}
  .index {
    position: absolute;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #c0c8d5;
  }
`;

const ButtonPrimary = styled.div`
  background: #191e27;
  padding: 12px;
  text-align: center;
  ${p_16_semibold};
  cursor: pointer;
  color: #ffffff;
`;

const ProxyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 12px;
  }
`;

const Toggle = styled.div`
  width: 30px;
  height: 18px;
  padding: 3px;
  background: #e2e8f0;
  cursor: pointer;
  > div {
    background: #ffffff;
    box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
      0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
    width: 12px;
    height: 12px;
  }
  ${(p) =>
    p.active &&
    css`
      background: #04d2c5;
      > div {
        margin-left: auto;
      }
    `}
`;

export default function PostVote({ data }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [choice, setChoice] = useState();
  const [grade, setGrade] = useState("");
  const [proxyVote, setProxyVote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const viewFunc = useViewfunc();
  const space = useSpace();

  const onVote = async () => {
    if (isLoading) return;
    if (!account) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: "Please connect wallet" })
      );
      return;
    }
    if (!viewFunc) {
      return;
    }
    setIsLoading(true);
    let result;
    try {
      result = await viewFunc.addVote(
        space,
        data?.cid,
        choice,
        account?.address
      );
    } catch (error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: error.toString() })
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    if (result?.error) {
      dispatch(
        addToast({ type: TOAST_TYPES.ERROR, message: result.error.message })
      );
    } else if (result) {
      dispatch(
        addToast({
          type: TOAST_TYPES.SUCCESS,
          message: "Add vote successfully!",
        })
      );
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Cast your vote</Title>
        <ButtonsWrapper>
          {(data.choices || []).map((item, index) => (
            <Button
              key={index}
              active={item === choice}
              onClick={() => setChoice(item)}
            >
              <div className="index">{`#${index + 1}`}</div>
              <div>{item}</div>
            </Button>
          ))}
        </ButtonsWrapper>
      </InnerWrapper>
      {choice && (
        <InnerWrapper>
          <Title>Grade</Title>
          <Input
            placeholder="What do you think about this proposal? (optional)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </InnerWrapper>
      )}
      <InnerWrapper>
        <ProxyHeader>
          <div>Available 100.00 KSM</div>
          <ToggleWrapper>
            <div>Proxy vote</div>
            <Toggle active={proxyVote} onClick={() => setProxyVote(!proxyVote)}>
              <div />
            </Toggle>
          </ToggleWrapper>
        </ProxyHeader>
        <ButtonPrimary onClick={onVote}>
          {proxyVote ? "Proxy Vote" : "Vote"}
        </ButtonPrimary>
      </InnerWrapper>
    </Wrapper>
  );
}
