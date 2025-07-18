import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import { p_16_semibold } from "styles/textStyles";
import StatusTag from "./statusTag";
import PostTime from "./postTime";
import { p_24 } from "../styles/paddings";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "../frontedUtils/hooks";
import PostResult from "./postResult";
import { findNetworkConfig } from "../services/util";
import { Flex, FlexBetween, Tooltip } from "@osn/common-ui";
import { p_14_medium } from "../styles/componentCss";
import { isCollectiveSpace, useSpaceIconUri } from "frontedUtils/space";

const Wrapper = styled.div`
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
  ${p_24};

  :hover {
    border-color: var(--strokeActionDefault);

    box-shadow: var(--shadowCardHover);
    .icon > svg {
      display: block;
    }
  }
`;

const Title = styled.h3`
  font-family: var(--font-inter), serif;
  font-style: normal;
  display: inline-block;
  ${p_16_semibold};
  flex-grow: 1;
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 16px 0;
`;

const InfoWrapper = styled(FlexBetween)`
  flex-wrap: wrap;
`;

const LeftWrapper = styled(Flex)`
  line-height: 24px;
  color: var(--textTertiary);
  flex-wrap: wrap;

  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const RightWrapper = styled(Flex)`
  gap: 8px;
`;

const FromSpace = styled(Flex)`
  .ml-4px {
    margin-left: 8px;
  }
`;

const SpaceName = styled.a`
  text-transform: capitalize;
  margin-left: 6px;
  ${p_14_medium};
  color: var(--textPrimary) !important;

  :hover {
    text-decoration-line: underline;
  }
`;

const TitleWrapper = styled(FlexBetween)`
  align-items: flex-start;
`;

function MyVoteMark({ proposal, myVote }) {
  if (!myVote || !proposal) {
    return null;
  }

  const getVoteIndex = (choice) =>
    proposal.choices.findIndex((item) => item === choice) + 1;

  const content = (
    <div>
      <span>Vote:</span>
      <ul>
        {myVote.choices.map((choice, index) => (
          <li key={index}>
            #{getVoteIndex(choice)}: {choice}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Tooltip content={content}>
      <img src="/imgs/icons/my-vote-mark.svg" alt="" />
    </Tooltip>
  );
}

export default function Post({ data, showSpace, space, myVotes }) {
  const windowSize = useWindowSize();
  const [showRichInfo, setShowRichInfo] = useState(true);
  const myVote = useMemo(
    () => myVotes.find((item) => item.data.proposalCid === data.cid),
    [myVotes, data.cid],
  );

  useEffect(() => {
    if (windowSize.width <= 900) {
      setShowRichInfo(false);
    } else {
      setShowRichInfo(true);
    }
  }, [windowSize.width, setShowRichInfo]);

  const isCollective = isCollectiveSpace(space?.type);

  const proposerNetworkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork,
  );

  const spaceSupportMultiChain = proposerNetworkConfig?.networks?.length > 1;

  const spaceInfo = space ?? data.spaceInfo;
  const spaceIcon = useSpaceIconUri(spaceInfo);

  return (
    <Wrapper>
      <TitleWrapper>
        <a href={`/space/${data.space}/proposal/${data.cid}`}>
          <Title>{data.title}</Title>
        </a>
        <PostResult data={data} space={spaceInfo} />
      </TitleWrapper>
      <Divider />
      <InfoWrapper>
        <LeftWrapper>
          {showRichInfo && (
            <Author
              address={data.proposer ?? data.address}
              space={proposerNetworkConfig}
              showNetwork={spaceSupportMultiChain}
              isCollective={isCollective}
            />
          )}
          {!showRichInfo && (
            <img width="20px" height="20px" src={spaceIcon} alt="" />
          )}
          <PostTime post={data} />
          {showSpace && showRichInfo && (
            <FromSpace>
              From
              <img
                width="20px"
                height="20px"
                className="ml-4px"
                src={spaceIcon}
                alt=""
              />
              <InternalLink href={`/space/${data.space}`}>
                <SpaceName>{spaceInfo?.name}</SpaceName>
              </InternalLink>
            </FromSpace>
          )}
        </LeftWrapper>
        <RightWrapper>
          <MyVoteMark proposal={data} myVote={myVote} />
          <StatusTag>{data.status}</StatusTag>
        </RightWrapper>
      </InfoWrapper>
    </Wrapper>
  );
}
