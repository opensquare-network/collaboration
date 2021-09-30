import styled from "styled-components";

import Layout from "components/layout";
import Nav from "components/nav";
import PostDetail from "components/postDetail";
import PostInfo from "components/postInfo";
import PostResults from "components/postResults";
import PostTab from "components/postTab";
import { useChain } from "utils/hooks";
import { SPACE_ITEMS } from "utils/constants";

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
`;

const SiderWrapper = styled.div`
  flex: 0 0 290px;
  margin-left: 20px;
  > :not(:first-child) {
    margin-top: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-basis: auto;
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`;

export default function Index() {
  const chain = useChain();
  const item = SPACE_ITEMS.find((item) => item.value === chain);

  return (
    <Layout bgHeight="183px">
      {item && (
        <Nav
          data={[
            { name: "Space", link: "/" },
            { name: item?.name, link: `/space/${item?.value}`, back: true },
            { name: "Proposal" },
          ]}
        />
      )}
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

export const getServerSideProps = withLoginUser(async (context) => {
  return {
    props: {
    },
  };
});
