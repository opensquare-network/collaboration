import styled from "styled-components";

import { Input, RichEditor } from "@osn/common-ui";

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
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export default function Content({ title, setTitle, content, setContent }) {
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Title</Title>
        <Input
          placeholder="Please text here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InnerWrapper>
      <InnerWrapper>
        <Title>Proposal</Title>
        <RichEditor
          content={content}
          setContent={setContent}
          showOkButton={false}
        />
      </InnerWrapper>
    </Wrapper>
  );
}
