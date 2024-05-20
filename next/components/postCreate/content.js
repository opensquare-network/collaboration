import styled from "styled-components";

import { Input, FlexBetween } from "@osn/common-ui";
import ToggleText from "@/components/uploadBanner/toggleText";
import Uploader from "@/components/uploadBanner/uploader";
import Editor from "../editor";

const Wrapper = styled.div`
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
  padding: 32px;
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export default function Content({
  title,
  setTitle,
  content,
  setContent,
  isSetBanner,
  setIsSetBanner,
  setBannerUrl,
}) {
  return (
    <Wrapper>
      <InnerWrapper>
        <FlexBetween>
          <Title>Title</Title>
          <ToggleText
            isSetBanner={isSetBanner}
            setIsSetBanner={setIsSetBanner}
          />
        </FlexBetween>
        <Input
          placeholder="Please text here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InnerWrapper>

      {isSetBanner && <Uploader setBannerUrl={setBannerUrl} />}

      <InnerWrapper>
        <Title>Proposal</Title>
        <Editor content={content} setContent={setContent} showButtons={false} />
      </InnerWrapper>
    </Wrapper>
  );
}
