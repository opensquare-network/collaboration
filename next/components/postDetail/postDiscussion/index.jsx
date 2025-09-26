import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "components/pagination";
import { findNetworkConfig } from "services/util";
import HeaderWithNumber from "@/components/postDetail/numberHeader";
import AccordionPanel from "@/components/accordionPanel/panel";
import NoData from "@osn/common-ui/es/NoData";
import { useSuggestions } from "@/components/postDetail/suggestions";
import { useMount } from "react-use";
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

function jumpToAnchor(anchorId) {
  const anchorElement = document.getElementById(anchorId);
  if (!anchorElement) {
    return;
  }
  const bodyRect = document.body.getBoundingClientRect();
  const elementRect = anchorElement.getBoundingClientRect();
  const offset = elementRect.top - bodyRect.top;
  const scrollPosition = offset - window.innerHeight / 2;
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth",
  });
}

const useCommentAnchor = () => {
  const router = useRouter();
  const anchorId = useMemo(() => {
    return router.asPath.split("#")[1];
  }, [router.asPath]);

  useEffect(() => {
    if (anchorId) {
      setTimeout(() => {
        jumpToAnchor(anchorId);
      }, 500);
    }
  }, [anchorId]);
  return anchorId;
};

export default function PostDiscussion({
  proposal,
  space,
  comments,
  votes,
  votesPage = 1,
}) {
  const [isMounted, setIsMounted] = useState();
  useMount(() => setIsMounted(true));
  const anchorId = useCommentAnchor();

  const getNetwork = (comment) =>
    findNetworkConfig(proposal.networksConfig, comment.commenterNetwork);
  const spaceSupportMultiChain = space?.networks?.length > 1;
  const { loadSuggestions } = useSuggestions(comments, votes);

  if (!isMounted) {
    return null;
  }

  return (
    <AccordionPanel
      head={<HeaderWithNumber title="Discussions" number={comments?.total} />}
    >
      {(comments?.items || []).map((item, index) => (
        <CommitItem
          active={anchorId === `commit_${item.height}`}
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
