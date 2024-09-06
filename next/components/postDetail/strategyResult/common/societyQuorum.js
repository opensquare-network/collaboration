import { SystemFail, SystemPass } from "@osn/icons/opensquare";
import {
  Divider,
  FlexAround,
  OptionIndex,
  ProgressItem,
  ResultHead,
  ResultName,
} from "./styled";
import BigNumber from "bignumber.js";

export default function SocietyQuorum({ proposal }) {
  const votersCount = proposal?.votedWeights?.societyVote || 0;
  const societyQuorum = proposal?.networksConfig?.societyQuorum || 0;
  const isQuorumReached = new BigNumber(votersCount).gte(societyQuorum);

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
            <span>{votersCount}</span>
            <span>&nbsp;/&nbsp;</span>
            <span>{societyQuorum}</span>
            <span>&nbsp;</span>
            {isQuorumReached ? <SystemPass /> : <SystemFail />}
          </FlexAround>
        </ProgressItem>
      </div>
    </>
  );
}
