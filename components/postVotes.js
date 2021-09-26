import styled from "styled-components";

import { VOTE_ITEMS } from "utils/constants";
import Author from "./author";
import Pagination from "./pagination";

const Item = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #f0f3f8;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  line-height: 24px;
`;

const Label = styled.span`
  color: #a1a8b3;
  margin-right: 8px;
`;

const ContentWrapper = styled.div`
  padding: 8px 0 0 28px;
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  line-height: 24px;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  > img {
    cursor: pointer;
    margin-right: 8px;
  }
`;

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PostVotes() {
  return (
    <div>
      {VOTE_ITEMS.map((item, index) => (
        <Item key={index}>
          <InfoWrapper>
            <Author username={item.author} />
            <div>
              <Label>Vote</Label>
              <span>{item.vote}</span>
            </div>
            <div>{item.value}</div>
          </InfoWrapper>
          {item.content && (
            <ContentWrapper>
              <Content>{item.content}</Content>
              <LikeWrapper>
                <img src="/imgs/icons/thumb-up.svg" alt="" />
                <span>0</span>
              </LikeWrapper>
            </ContentWrapper>
          )}
        </Item>
      ))}
      <PaginationWrapper>
        <Pagination />
      </PaginationWrapper>
    </div>
  );
}
