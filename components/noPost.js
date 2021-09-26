import styled from "styled-components";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  height: 138px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #9da9bb;
`;

export default function NoPost() {
  return <Wrapper>No current active proposals</Wrapper>;
}
