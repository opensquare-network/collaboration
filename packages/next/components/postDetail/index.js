import styled from "styled-components";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  loginAccountSelector,
  setAvailableNetworks,
} from "store/reducers/accountSlice";
import { decodeAddress, addressEq } from "@polkadot/util-crypto";

import PostContent from "./postContent";
import PostInfo from "./postInfo";
import PostResults from "./postResults";
import PostVotes from "@/components/postDetail/postVotes";
import PostDiscussion from "@/components/postDetail/postDiscussion";
import Append from "@/components/postDetail/append";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 290px;
  max-width: 290px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    max-width: none;
  }
`;

export default function PostDetail({
  data,
  space,
  votes,
  voteStatus,
  comments,
  defaultPage,
  myVote,
}) {
  const account = useSelector(loginAccountSelector);
  const [appendEnabled, setAppendEnabled] = useState(false);

  useEffect(() => {
    if (account?.address && addressEq(account.address, data.proposer)) {
      setAppendEnabled(true);
    } else {
      setAppendEnabled(false);
    }
  }, [account?.network, account?.address, account?.ss58Format]);

  return (
    <Wrapper>
      <MainWrapper>
        <PostContent data={data} space={space} />
        {appendEnabled && <Append />}
        <PostVotes
          proposal={data}
          votes={votes}
          myVote={myVote}
          discussionPage={defaultPage?.discussionPage}
        />
        <PostDiscussion proposal={data} comments={comments} space={space} />
      </MainWrapper>
      <SiderWrapper>
        <PostInfo data={data} space={space} />
        <PostResults data={data} voteStatus={voteStatus} space={space} />
      </SiderWrapper>
    </Wrapper>
  );
}
