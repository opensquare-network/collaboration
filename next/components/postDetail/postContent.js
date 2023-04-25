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
import SubTitle from "@osn/common-ui/es/styled/SubTitle";
import Appendants from "./appendants";
import { useSelector } from "react-redux";
import { loginAddressSelector } from "store/reducers/accountSlice";
import { proposalStatus } from "frontedUtils/consts/proposal";
import { MarkdownPreviewer } from "@osn/previewer";
import PostBanner from "@/components/postDetail/postBanner";

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
  const loginAddress = useSelector(loginAddressSelector);
  const isOwner = loginAddress === (data.proposor || data.address);
  const networkConfig = findNetworkConfig(
    data.networksConfig,
    data.proposerNetwork,
  );
  const spaceSupportMultiChain = space?.networks?.length > 1;
  const proposalClosed = [
    proposalStatus.closed,
    proposalStatus.terminated,
  ].includes(data?.status);

  const showAppendants =
    (isOwner && !proposalClosed) || data.appendants?.length > 0;

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
      <PostBanner
        bannerUrl={
          data?.banner &&
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/ipfs/files/${data?.banner}`
        }
      />
      <Accordion
        head={<SubTitle style={{ marginBottom: 16 }}>Description</SubTitle>}
      >
        <Content>
          <MarkdownPreviewer content={data?.content} />
        </Content>
      </Accordion>
      {showAppendants && (
        <>
          <Divider />
          <Appendants
            proposal={data}
            appendants={data.appendants}
            editable={isOwner && !proposalClosed}
          />
        </>
      )}
      <Divider />
      <Share uid={data.postUid} />
      <PostVote proposal={data} />
    </Panel>
  );
}
