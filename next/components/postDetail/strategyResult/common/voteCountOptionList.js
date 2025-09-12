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
import isNil from "lodash.isnil";
import LoadingField from "@/components/loadingField";

export default function VoteCountOptionList({ optionList, strategy, total }) {
  return (
    <>
      {strategy && (
        <>
          <ResultHead>
            <ResultName>{strategy}</ResultName>
          </ResultHead>
          <Divider />
        </>
      )}
      {optionList.map((vote, index) => {
        return (
          <div key={index}>
            <ProgressItem>
              <Tooltip content={vote.choice}>
                <OptionIndex>{vote.choice}</OptionIndex>
              </Tooltip>
              <FlexAround>
                <LoadingField isLoading={isNil(vote.voteBalance)}>
                  <Tooltip
                    content={
                      total === 0
                        ? "0.00%"
                        : `${((vote.voteBalance / total) * 100).toFixed(2)}%`
                    }
                  >
                    <div>{vote.voteBalance} VOTE</div>
                  </Tooltip>
                  {vote.icon && <>&nbsp;{vote.icon}</>}
                </LoadingField>
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
