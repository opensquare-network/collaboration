import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2e343d;
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

export default function Author({ username }) {
  return (
    <Wrapper>
      <Avatar src="/imgs/avatar.png" />
      <Name>{username}</Name>
    </Wrapper>
  );
}
