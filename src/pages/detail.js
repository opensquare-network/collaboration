import styled from "styled-components";
import Layout from "components/layout";

import { DETAIL_NAV_ITEMS } from "utils/constants";
import Nav from "components/nav";
import PostDetail from "../components/postDetail";
import PostInfo from "../components/postInfo";
import PostResults from "../components/postResults";
import PostTab from "components/postTab";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 22px;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const SiderWrapper = styled.div`
  flex: 0 0 290px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 900px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

export default function Index() {
  return (
    <Layout bgHeight="183px">
      <Nav data={DETAIL_NAV_ITEMS} />
      <Wrapper>
        <MainWrapper>
          <PostDetail />
          <PostTab />
        </MainWrapper>
        <SiderWrapper>
          <PostInfo />
          <PostResults />
        </SiderWrapper>
      </Wrapper>
    </Layout>
  );
}
