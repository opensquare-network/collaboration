import styled from "styled-components";
import { p_14_medium, p_16_semibold } from "styles/textStyles";
import BigNumber from "bignumber.js";
import { toPrecision } from "../../utils";

const Wrapper = styled.div`
  padding: 40px 32px;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
  0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const TitleWrapper = styled.div`
  ${p_16_semibold};
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
  ${p_16_semibold};

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

const OptionIndex = styled.div`
  ${p_14_medium};
  color: #C0C8D4;
`

export default function PostResult({data, voteStatus, network}) {
  const votedAmount = voteStatus?.reduce(function(sum, current) {
    return sum.plus(new BigNumber(current.balanceOf.$numberDecimal));
  }, new BigNumber("0")) ?? new BigNumber("0");

  const optionList = [];
  data?.choices?.forEach((choice,index) => {
    for(let voteStat of voteStatus) {
      if (voteStat.choice !== choice) {
        continue;
      }
      const voteBalance = new BigNumber(voteStat.balanceOf.$numberDecimal);
      const percentage = (voteStat.balanceOf.$numberDecimal > 0
        ? (voteBalance).dividedBy(votedAmount)
        : 0).toFixed(2);
      optionList.push({index: index + 1, voteBalance, percentage})
      return;
    }
    optionList.push({index: index + 1, voteBalance:new BigNumber("0"), percentage:"0"});
  })

  return (
    <Wrapper>
      <TitleWrapper>
        Results
        <img src="/imgs/icons/strategy.svg" alt=""/>
      </TitleWrapper>
      <Divider/>
      <div>
        <VoteItem>
          <div>Voted</div>
          <div>{toPrecision(votedAmount.toString(), network.decimals)} {network.symbol}</div>
        </VoteItem>
        <VoteItem>
          <div>Number of voters</div>
          <div>{data?.votesCount}</div>
        </VoteItem>
      </div>
      <Divider/>
      {
        optionList.map((vote) => {
          return <div key={vote.index}>
          <ProgressItem>
            <OptionIndex>#{vote.index}</OptionIndex>
            <div>{vote.percentage}%</div>
            <div>{toPrecision(vote.voteBalance.toString(), network.decimals)} {network.symbol}</div>
          </ProgressItem>
          <ProgressBackground>
            <ProgressBar percent={`${vote.percentage}%`}/>
          </ProgressBackground>
        </div>
        })
      }
    </Wrapper>
  );
}
