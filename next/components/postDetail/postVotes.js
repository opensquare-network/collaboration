import styled from "styled-components";

import Pagination from "components/pagination";
import PostVotesItem from "./postVotesItem";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoVoteWrapper = styled.div`
  height: 104px;
  border-bottom: 1px solid #f0f3f8;

  > div {
    border: none;
    box-shadow: none;
    height: 100%;
  }
`;

export default function PostVotes({
  proposal,
  votes,
  myVote,
  discussionPage = 1,
  isSafari = false,
}) {
  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Votes" number={votes?.total} />}
    >
      <div>
        {myVote && (
          <PostVotesItem
            choices={proposal.choices}
            data={myVote}
            space={proposal.networksConfig}
            isMyVote={true}
            isSafari={isSafari}
          />
        )}
      </div>
      {(votes?.items || [])
        .filter(
          (item) =>
            item.voter !== myVote?.voter ||
            item.voterNetwork !== myVote?.voterNetwork,
        )
        .map((item, index) => (
          <PostVotesItem
            choices={proposal.choices}
            data={item}
            space={proposal.networksConfig}
            key={index}
            isSafari={isSafari}
            isDelegate={item.isDelegate}
          />
        ))}
      {!votes?.items?.length > 0 && (
        <NoVoteWrapper>
          <NoData message="No current votes" />
        </NoVoteWrapper>
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
