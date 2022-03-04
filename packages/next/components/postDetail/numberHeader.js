import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  border-bottom: 1px solid #f0f3f8;
  padding-bottom: 20px;

  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  span {
    margin-left: 4px;
    color: #a1a8b3;
    font-weight: 500;
  }
`;

export default function HeaderWithNumber({ title = "", number = 0 }) {
  return (
    <Wrapper>
      <h3>
        {title}
        <span>·</span>
        <span className="number">{number}</span>
      </h3>
    </Wrapper>
  );
}
