import styled, { css } from "styled-components";

import PostVote from "./postVote";
import Author from "components/author";
import { p_14_normal, p_semibold } from "styles/textStyles";
import PostTime from "components/postTime";
import StatusTag from "components/statusTag";
import { findNetworkConfig } from "services/util";
import Share from "components/share";
import Panel from "@/components/postDetail/panel";
import Accordion from "@/components/accordionPanel/accordion";
import SubTitle from "@osn/common-ui/dist/styled/SubTitle";
import dynamic from "next/dynamic";
const Preview = dynamic(() => import("@osn/common-ui/es/Preview"), {
  ssr: false,
});

const Title = styled.div`
  ${p_semibold};
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  flex-wrap: wrap;
  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 20px 0;
  ${(p) =>
    p.margin &&
    css`
      margin: ${p.margin}px 0;
    `}
`;

const Content = styled.div`
  ${p_14_normal};
  color: #1e2134;
`;

export default function PostContent({ data, space }) {
  const networkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork
  );
  const spaceSupportMultiChain = space?.networks?.length > 1;
  return (
    <Panel>
      <Title>{data?.title}</Title>
      <InfoWrapper>
        <LeftWrapper>
          <Author
            address={data.proposer ?? data.address}
            space={networkConfig}
            showNetwork={spaceSupportMultiChain}
          />
          <PostTime post={data} />
        </LeftWrapper>
        <StatusTag>{data.status}</StatusTag>
      </InfoWrapper>
      <Divider margin={20} />
      <Accordion
        head={<SubTitle style={{ marginBottom: 16 }}>Description</SubTitle>}
      >
        <Content>
          <Preview content={data?.content} bordered={false} />
        </Content>
      </Accordion>
      <Divider />
      <Share />
      <PostVote proposal={data} threshold={space.voteThreshold} />
    </Panel>
  );
}
