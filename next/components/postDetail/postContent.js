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
import { isSameAddress } from "frontedUtils/address";
import { isCollectiveSpace } from "frontedUtils/space";
import { ArrowCaretLeft } from "@osn/icons/opensquare";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { cn } from "@osn/common-ui";

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
  color: var(--textTertiary);
  flex-wrap: wrap;
  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--fillBgTertiary);
  margin: 20px 0;
  ${(p) =>
    p.margin &&
    css`
      margin: ${p.margin}px 0;
    `}
`;

const Content = styled.div`
  ${p_14_normal};
  color: var(--textPrimary);
`;

export default function PostContent({ data, space, loadSuggestions }) {
  const loginAddress = useSelector(loginAddressSelector);
  const isOwner = isSameAddress(loginAddress, data.proposor || data.address);
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
      <TitleContent title={data?.title} />
      <InfoWrapper>
        <LeftWrapper>
          <Author
            address={data.proposer ?? data.address}
            space={networkConfig}
            showNetwork={spaceSupportMultiChain}
            isCollective={isCollectiveSpace(space?.type)}
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
            loadSuggestions={loadSuggestions}
            proposal={data}
            appendants={data.appendants}
            editable={isOwner && !proposalClosed}
          />
        </>
      )}
      <Divider />
      <Share uid={data.postUid} />
      <PostVote proposal={data} loadSuggestions={loadSuggestions} />
    </Panel>
  );
}

const TitleContent = ({ title }) => {
  const titleRef = useRef();
  const [offsetTop, setOffsetTop] = useState(152);
  const [scrollY, setScrollY] = useState(0);
  const debouncedScrollHandler = useRef(null);
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {}, [handleScroll]);

  useEffect(() => {
    if (!titleRef.current) {
      return;
    }
    const { top, height } = titleRef.current.getBoundingClientRect();
    setOffsetTop(top + height - 66);
    debouncedScrollHandler.current = debounce(handleScroll, 10);
    window.addEventListener("scroll", debouncedScrollHandler.current);

    return () => {
      if (debouncedScrollHandler.current) {
        debouncedScrollHandler.current.cancel();
        window.removeEventListener("scroll", debouncedScrollHandler.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <Title ref={titleRef}>{title}</Title>
      <div
        className={cn(
          "fixed py-5  z-10 top-0 transform -translate-y-full left-0 w-full bg-fillBgPrimary border border-strokeBorderDefault shadow-shadowCardDefault",
          scrollY > offsetTop && "translate-y-0",
        )}
      >
        <div className="md:max-w-[1144px] mx-auto md:px-8 px-5 flex relative">
          <div className="w-full md:!w-[calc(100%-320px)] flex items-center">
            <ArrowCaretLeft className="w-8 h-8 p-1 md:ml-8 ml-5 rounded-full border shadow  absolute left-0 -translate-x-1/2 " />
            <div className="pl-8 md:px-8 font-[700] text-base md:font-[600] md:text-[20px] whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
