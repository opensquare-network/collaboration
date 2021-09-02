import styled, { css } from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  line-height: 24px;
  > :first-child {
    font-size: 18px;
  }
  :last-child {
    font-size: 14px;
  }
`;

const ButtonsWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Button = styled.div`
  border: 1px solid #e2e8f0;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  :hover {
    border-color: #b7c0cc;
  }
  ${(p) =>
    p.active &&
    css`
      border-color: #6848ff !important;
      color: #6848ff;
    `}
`;

const Textarea = styled.textarea`
  all: unset;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
  border: 1px solid #b7c0cc;
  width: 100%;
  resize: vertical;
  min-height: 96px;
  outline: none;
  box-sizing: border-box;
  ::placeholder {
    color: #e3e7ed;
  }
`;

const ButtonPrimary = styled.div`
  background: #191e27;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  color: #ffffff;
`;

export default function PostVote() {
  const [vote, setVote] = useState();

  return (
    <Wrapper>
      <TitleWrapper>
        <div>Cast your vote</div>
        <div>Available votes 0 KSM</div>
      </TitleWrapper>
      <ButtonsWrapper>
        <Button active={vote === "for"} onClick={() => setVote("for")}>
          Vote FOR
        </Button>
        <Button active={vote === "against"} onClick={() => setVote("against")}>
          Vote AGAINST
        </Button>
      </ButtonsWrapper>
      {vote && (
        <Textarea placeholder="What do you think about this proposal? (optional)" />
      )}
      <ButtonPrimary>Vote</ButtonPrimary>
    </Wrapper>
  );
}
