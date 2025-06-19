import styled from "styled-components";

import Post from "./post";
import { p_20_semibold } from "../styles/textStyles";
import Pagination from "@/components/pagination";
import NoData from "@osn/common-ui/es/NoData";
import { useEffect, useState } from "react";
import nextApi from "services/nextApi";
import { loginAccountSelector } from "store/reducers/accountSlice";
import { useSelector } from "react-redux";

const Title = styled.div`
  ${p_20_semibold};
  margin-bottom: 20px;
`;

const PostsWrapper = styled.div`
  padding-top: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

function useMyVotes(proposals) {
  const [myVotes, setMyVotes] = useState([]);
  const account = useSelector(loginAccountSelector);
  const voter = account?.address;
  const voterNetwork = account?.network;

  useEffect(() => {
    if (!proposals || proposals?.length === 0 || !voter || !voterNetwork) {
      return;
    }

    nextApi
      .fetch("votes", {
        address: voter,
        network: voterNetwork,
        proposalCid: proposals.map((p) => p.cid).join(","),
      })
      .then(({ result }) => {
        setMyVotes(result || []);
      });
  }, [proposals, voter, voterNetwork]);

  return myVotes;
}

export default function PostList({
  title,
  posts,
  space,
  spaces,
  showSpace = false,
}) {
  const items = Array.isArray(posts) ? posts : posts?.items ?? [];
  const myVotes = useMyVotes(items);

  return (
    <div>
      {title && <Title>{title}</Title>}
      <PostsWrapper>
        {items.map((item, index) => (
          <Post
            key={index}
            data={item}
            showSpace={showSpace}
            space={space}
            spaces={spaces}
            myVotes={myVotes}
          />
        ))}
        {items.length === 0 && <NoData message="No current active proposals" />}
        {posts?.page && (
          <Pagination
            page={posts?.page}
            total={posts?.total}
            pageSize={posts?.pageSize}
          />
        )}
      </PostsWrapper>
    </div>
  );
}
