import styled from "styled-components";
import Pagination from "components/pagination";
import { findNetworkConfig } from "services/util";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";
import CommitItem from "./commitItem";
import CommitEditor from "./commitEditor";

const NoCommentWrapper = styled.div`
  height: 104px;
  border-bottom: 1px solid var(--strokeBorderDefault);

  > div {
    border: none;
    box-shadow: none;
    height: 100%;
  }
`;

export default function PostDiscussion({
  proposal,
  space,
  commentData,
  loadSuggestions,
}) {
  return (
    <AccordionPanel
      head={
        <HeaderWithNumber title="Discussions" number={commentData?.total} />
      }
    >
      <Items commentData={commentData} proposal={proposal} space={space} />
      <div className="py-5">
        <Pagination
          page={commentData?.page}
          total={commentData?.total}
          pageSize={commentData?.pageSize}
          pageKey="discussion_page"
          otherQueries={{
            page: commentData?.page,
          }}
        />
      </div>
      <div className="px-5">
        <CommitEditor
          proposal={proposal}
          space={space}
          loadSuggestions={loadSuggestions}
        />
      </div>
    </AccordionPanel>
  );
}

function Items({ commentData, space, proposal }) {
  if (!commentData?.items?.length > 0) {
    return (
      <NoCommentWrapper>
        <NoData message="No current comment data" />
      </NoCommentWrapper>
    );
  }

  const getNetwork = (comment) =>
    findNetworkConfig(proposal.networksConfig, comment.commenterNetwork);
  const spaceSupportMultiChain = space?.networks?.length > 1;

  return (
    <>
      {(commentData?.items || []).map((item, index) => (
        <CommitItem
          key={index}
          item={item}
          spaceSupportMultiChain={spaceSupportMultiChain}
          space={getNetwork(item)}
        />
      ))}
    </>
  );
}
