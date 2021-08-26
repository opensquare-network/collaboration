import styled from "styled-components";

import Author from "./author";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  padding: 24px 32px;
`;

const Title = styled.div`
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
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
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;
  color: #a1a8b3;
  > :not(:first-child)::before {
    content: "·";
    margin: 0 8px;
  }
`;

const Status = styled.div`
  background: #04d2c5;
  padding: 3px 12px;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
`;

export default function Post({ data }) {
  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <Divider />
      <InfoWrapper>
        <LeftWrapper>
          <Author username={data.author} />
          <div>{data.time}</div>
        </LeftWrapper>
        <Status>{data.status}</Status>
      </InfoWrapper>
    </Wrapper>
  );
}
