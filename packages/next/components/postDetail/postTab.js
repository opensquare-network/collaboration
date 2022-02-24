import styled, { css } from "styled-components";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

import PostVotes from "./postVotes";
import PostDiscussion from "./postDiscussion";
import { p_16_semibold } from "styles/textStyles";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 32px;
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f3f8;
`;

const TabItem = styled.div`
  ${p_16_semibold};
  padding-bottom: 20px;
  cursor: pointer;
  :not(:first-child) {
    margin-left: 40px;
  }
  ${(p) =>
    p.active &&
    css`
      border-bottom: 3px solid #04d2c5;
    `}
`;

export default function PostTab({
  data,
  space,
  votes,
  comments,
  defaultPage,
  myVote,
}) {
  const router = useRouter();
  const { space: spaceId, id } = router.query;
  const [activeTab, setActiveTab] = useState(defaultPage?.tab ?? "votes");
  const tabs = useMemo(
    () => [
      {
        name: "Votes",
        value: "votes",
        component: (
          <PostVotes
            proposal={data}
            votes={votes}
            myVote={myVote}
          />
        ),
        default: true,
      },
      {
        name: "Discussions",
        value: "discussion",
        component: (
          <PostDiscussion data={data} comments={comments} space={space} />
        ),
      },
    ],
    [votes, space, data, comments, myVote]
  );

  useEffect(() => {
    const activeTab = tabs.find(
      (item) => item.value === router.query.tab
    )?.value;
    setActiveTab(activeTab ?? "votes");
  }, [tabs, router]);

  return (
    <Wrapper>
      <TabWrapper>
        {tabs.map((item, index) => (
          <TabItem
            key={index}
            active={item.value === activeTab}
            onClick={() => {
              router.push(
                {
                  query: {
                    space: spaceId,
                    id,
                    ...(item.default ? {} : { tab: item.value }),
                    ...(item.value === defaultPage?.tab
                      ? defaultPage.page > 1
                        ? { page: defaultPage.page }
                        : {}
                      : {}),
                  },
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            {item.name}
          </TabItem>
        ))}
      </TabWrapper>
      {tabs.find((item) => item.value === activeTab)?.component}
    </Wrapper>
  );
}
