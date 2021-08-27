import styled from "styled-components";

const Wrapper = styled.div`
  padding: 40px 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
`;

const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 12px 0;
`;

const VoteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  :not(:first-child) {
    margin-top: 4px;
  }
  > :first-child {
    color: #a1a8b3;
  }
`;

const ProgressItem = styled.div`
  margin: 12px 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const ProgressBackground = styled.div`
  height: 6px;
  border-radius: 3px;
  background: #f0f3f8;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
  background: #6848ff;
  width: ${(p) => p.percent};
`;

export default function PostResult() {
  return (
    <Wrapper>
      <TitleWrapper>
        Results
        <img src="/imgs/icons/strategy.svg" />
      </TitleWrapper>
      <Divider />
      <div>
        <VoteItem>
          <div>Voted</div>
          <div>balance-of</div>
        </VoteItem>
        <VoteItem>
          <div>Snapshot</div>
          <div>65,408,852</div>
        </VoteItem>
      </div>
      <Divider />
      <ProgressItem>
        <div>32.42%</div>
        <div>12852 KSM</div>
      </ProgressItem>
      <ProgressBackground>
        <ProgressBar percent="32.42%" />
      </ProgressBackground>
      <ProgressItem>
        <div>16.59%</div>
        <div>6852 KSM</div>
      </ProgressItem>
      <ProgressBackground>
        <ProgressBar percent="16.59%" />
      </ProgressBackground>
      <ProgressItem>
        <div>50.23%</div>
        <div>21852 KSM</div>
      </ProgressItem>
      <ProgressBackground>
        <ProgressBar percent="50.23%" />
      </ProgressBackground>
    </Wrapper>
  );
}
