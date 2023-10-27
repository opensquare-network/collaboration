import {
  Divider,
  FlexAround,
  OptionIndex,
  ProgressItem,
  ResultHead,
  ResultName,
  StatusItem,
  StatusWrapper,
} from "./styled";
import ValueDisplay from "@/components/valueDisplay";

export default function Quorum({ votedBalance, space, isPass, isEnded }) {
  let passStatusText = "";
  if (isPass) {
    if (isEnded) {
      passStatusText = "Passed";
    } else {
      passStatusText = "Passing";
    }
  } else {
    if (isEnded) {
      passStatusText = "Failed";
    } else {
      passStatusText = "Failing";
    }
  }

  return (
    <>
      <ResultHead>
        <ResultName>Quorum</ResultName>
      </ResultHead>
      <Divider />
      <div>
        <ProgressItem>
          <OptionIndex>Quorum</OptionIndex>
          <FlexAround>
            <ValueDisplay value={votedBalance} space={space} noSymbol />
            <span>&nbsp;/&nbsp;</span>
            <ValueDisplay
              value={space?.quorum || 0}
              space={space}
              noSymbol
              className="quorum-value"
            />
          </FlexAround>
        </ProgressItem>
      </div>
      <StatusWrapper>
        <StatusItem positive={isPass}>{passStatusText}</StatusItem>
      </StatusWrapper>
    </>
  );
}
