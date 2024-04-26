import { SystemFail, SystemPass } from "@osn/icons/opensquare";
import {
  Divider,
  FlexAround,
  OptionIndex,
  ProgressItem,
  ResultHead,
  ResultName,
} from "./styled";
import ValueDisplay from "@/components/valueDisplay";
import BigNumber from "bignumber.js";

export default function Quorum({ proposal, space }) {
  const votedBalance = proposal?.votedWeights?.balanceOf || 0;
  const isQuorumReached = new BigNumber(votedBalance).gte(space?.quorum);

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
            <span>&nbsp;</span>
            {isQuorumReached ? <SystemPass /> : <SystemFail />}
          </FlexAround>
        </ProgressItem>
      </div>
    </>
  );
}
