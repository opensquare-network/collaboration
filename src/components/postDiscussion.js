import styled from "styled-components";

import Author from "./author";
import { DISCUSSION_ITEMS } from "utils/constants";
import Pagination from "./pagination";

const Item = styled.div`
  padding-top: 20px;
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  > :not(:first-child) {
    ::before {
      content: "·";
      font-size: 14px;
      line-height: 24px;
      color: #e3e7ed;
      margin: 0 8px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin: 8px 0 0 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f3f8;
`;

const Content = styled.div`
  line-height: 24px;
`;

const PaginationWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PostDiscussion() {
  return (
    <div>
      {DISCUSSION_ITEMS.map((item, index) => (
        <Item key={index}>
          <DividerWrapper>
            <Author username={item.author} />
            <div>{item.time}</div>
          </DividerWrapper>
          <ContentWrapper>
            <Content>{item.content}</Content>
          </ContentWrapper>
        </Item>
      ))}
      <PaginationWrapper>
        <Pagination />
      </PaginationWrapper>
    </div>
  );
}
