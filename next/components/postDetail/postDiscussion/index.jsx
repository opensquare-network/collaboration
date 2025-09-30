import styled from "styled-components";
import Pagination from "components/pagination";
import { findNetworkConfig } from "services/util";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";
import CommitItem from "./commitItem";
import CommitEditor from "./commitEditor";

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  comments,
  votesPage = 1,
  loadSuggestions,
}) {
  const getNetwork = (comment) =>
    findNetworkConfig(proposal.networksConfig, comment.commenterNetwork);
  const spaceSupportMultiChain = space?.networks?.length > 1;

  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Discussions" number={comments?.total} />}
    >
      {(comments?.items || []).map((item, index) => (
        <CommitItem
          key={index}
          item={item}
          spaceSupportMultiChain={spaceSupportMultiChain}
          space={getNetwork(item)}
        />
      ))}
      <div className="px-5 md:px-8">
        {!comments?.items?.length > 0 && (
          <NoCommentWrapper>
            <NoData message="No current comments" />
          </NoCommentWrapper>
        )}
        <PaginationWrapper>
          <Pagination
            page={comments?.page}
            total={comments?.total}
            pageSize={comments?.pageSize}
            pageKey="discussion_page"
            otherQueries={{
              page: votesPage,
            }}
          />
        </PaginationWrapper>
        <CommitEditor
          proposal={proposal}
          space={space}
          loadSuggestions={loadSuggestions}
        />
      </div>
    </AccordionPanel>
  );
}
