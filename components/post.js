import styled from "styled-components";

import Author from "./author";
import InternalLink from "components/internalLink";
import { p_18_medium } from "styles/textStyles";
import { addressEllipsis, timeDuration } from "utils";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 24px 32px;
`;

const Title = styled.div`
  display: inline-block;
  ${p_18_medium};
  :hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 20px 0;
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

const Status = styled.div`
  padding: 3px 12px;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
  background: ${(p) => (p.active ? "#04d2c5" : "#e2e8f0")};
`;

export default function Post({ data }) {
  return (
    <Wrapper>
      <InternalLink href="/space/polkadot/1">
        <Title>{data.title}</Title>
      </InternalLink>
      <Divider />
      <InfoWrapper>
        <LeftWrapper>
          <Author username={addressEllipsis(data.address)} />
          <div>{timeDuration(data.createdAt)}</div>
        </LeftWrapper>
        {data.status && (
          <Status active={data.status === "Active"}>{data.status}</Status>
        )}
      </InfoWrapper>
    </Wrapper>
  );
}
