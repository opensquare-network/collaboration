import styled, { css } from "styled-components";
import { useState } from "react";

import PostVotes from "./postVotes";
import PostDiscussion from "./postDiscussion";
import { p_16_semibold } from "styles/textStyles";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 40px;
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

export default function PostTab({ data }) {
  const tabs = [
    {
      name: "Votes",
      component: <PostVotes data={data} />,
    },
    {
      name: "Discussion",
      component: <PostDiscussion />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <Wrapper>
      <TabWrapper>
        {tabs.map((item, index) => (
          <TabItem
            active={item.name === activeTab}
            key={index}
            onClick={() => setActiveTab(item.name)}
          >
            {item.name}
          </TabItem>
        ))}
      </TabWrapper>
      {tabs.find((item) => item.name === activeTab)?.component}
    </Wrapper>
  );
}
