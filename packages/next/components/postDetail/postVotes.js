import styled from "styled-components";

import Pagination from "components/pagination";
import PostVotesItem from "./postVotesItem";
import { findNetworkConfig } from "../../services/util";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoVoteWrapper = styled.div`
  display: flex;
  height: 104px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
  border-bottom: 1px solid #f0f3f8;
`;

export default function PostVotes({
  proposal,
  votes,
  myVote,
  discussionPage = 1,
}) {
  const getNetwork = (vote) =>
    findNetworkConfig(proposal.networksConfig, vote.voterNetwork);

  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Votes" number={votes?.total} />}
    >
      <div>
        {myVote && (
          <PostVotesItem
            data={myVote}
            space={getNetwork(myVote)}
            isMyVote={true}
          />
        )}
      </div>
      {(votes?.items || [])
        .filter(
          (item) =>
            item.voter !== myVote?.voter ||
            item.voterNetwork !== myVote?.voterNetwork
        )
        .map((item, index) => (
          <PostVotesItem data={item} space={getNetwork(item)} key={index} />
        ))}
      {!votes?.items?.length > 0 && (
        <NoVoteWrapper>No current votes</NoVoteWrapper>
      )}
      <PaginationWrapper>
        <Pagination
          page={votes.page}
          total={votes.total}
          pageSize={votes.pageSize}
          otherQueries={{
            discussion_page: discussionPage,
          }}
        />
      </PaginationWrapper>
    </AccordionPanel>
  );
}
