import BigNumber from "bignumber.js";
import { ReactComponent as LinkSvg } from "public/imgs/icons/link.svg";
import ExternalLink from "@osn/common-ui/es/ExternalLink";
import BiasedVotingItem from "../biasedVotingItem";
import {
  BiasedVotingWrapper,
  Divider,
  ResultHead,
  ResultName,
  ResultStatus,
  StatusItem,
  StatusResultHead,
  StatusResultName,
  StatusWrapper,
  Subtitle,
  SubtitleWrapper,
} from "./common/styled";

export default function BiasedVotingResult({ voteStatus, space, proposal }) {
  const isEnded = new Date().getTime() > proposal?.endDate;

  if (!voteStatus?.[0]?.biasedVoting) {
    return null;
  }

  return (
    <>
      <ResultHead>
        <SubtitleWrapper>
          <ResultName>biased-voting</ResultName>
          <Subtitle>
            <ExternalLink href="https://wiki.polkadot.network/docs/learn-governance#tallying">
              <LinkSvg />
            </ExternalLink>
          </Subtitle>
        </SubtitleWrapper>
      </ResultHead>
      <Divider />
      <BiasedVotingWrapper>
        {(voteStatus || []).map((item, index) => (
          <div key={index}>
            <BiasedVotingItem
              label={item.choice}
              value={item.balanceOf}
              space={space}
            />
          </div>
        ))}
        <div>
          <BiasedVotingItem
            label="Turnout"
            value={voteStatus.reduce(
              (pre, cur) =>
                new BigNumber(pre).plus(new BigNumber(cur.balanceOf ?? 0)),
              0,
            )}
            space={space}
          ></BiasedVotingItem>
        </div>
        <div>
          <BiasedVotingItem
            label="Electorate"
            value={voteStatus?.[0]?.biasedVoting?.electorate || 0}
            space={space}
          ></BiasedVotingItem>
        </div>
      </BiasedVotingWrapper>
      <Divider />
      <StatusResultHead>
        <StatusResultName>Status</StatusResultName>
        <ResultStatus>SuperMajorityApprove</ResultStatus>
      </StatusResultHead>
      <StatusWrapper>
        <StatusItem
          positive={voteStatus?.[0]?.biasedVoting?.superMajorityApprove}
        >
          #1{" "}
          {voteStatus?.[0]?.biasedVoting?.superMajorityApprove
            ? isEnded
              ? "Passed"
              : "Passing"
            : isEnded
            ? "Failed"
            : "Failing"}
        </StatusItem>
      </StatusWrapper>
      <Divider />
      <StatusResultHead>
        <StatusResultName>Status</StatusResultName>
        <ResultStatus>SuperMajorityAgainst</ResultStatus>
      </StatusResultHead>
      <StatusWrapper>
        <StatusItem
          positive={voteStatus?.[0]?.biasedVoting?.superMajorityAgainst}
        >
          #1{" "}
          {voteStatus?.[0]?.biasedVoting?.superMajorityAgainst
            ? isEnded
              ? "Passed"
              : "Passing"
            : isEnded
            ? "Failed"
            : "Failing"}
        </StatusItem>
      </StatusWrapper>
    </>
  );
}
