import { Tooltip } from "@osn/common-ui";
import {
  Divider,
  FlexAround,
  OptionIndex,
  ProgressBackground,
  ProgressBar,
  ProgressItem,
  ResultHead,
  ResultName,
} from "./styled";
import { toPrecision } from "@osn/common";

export default function OnePersonOneVoteOptionList({
  optionList,
  strategy,
  space,
}) {
  const symbol = space?.symbol;

  return (
    <>
      <ResultHead>
        <ResultName>{strategy}</ResultName>
      </ResultHead>
      <Divider />
      {optionList.map((vote, index) => {
        return (
          <div key={index}>
            <ProgressItem>
              <Tooltip content={vote.choice}>
                <OptionIndex>{vote.choice}</OptionIndex>
              </Tooltip>
              <FlexAround>
                <Tooltip
                  content={`${toPrecision(
                    vote.voteBalance,
                    space?.decimals,
                  )} ${symbol} (${vote.percentage}%)`}
                >
                  <div>{vote.voteBalance} VOTE</div>
                </Tooltip>
                {vote.icon && <>&nbsp;{vote.icon}</>}
              </FlexAround>
            </ProgressItem>
            <ProgressBackground>
              <ProgressBar percent={`${vote.percentage}%`} />
            </ProgressBackground>
          </div>
        );
      })}
    </>
  );
}