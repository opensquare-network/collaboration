import styled from "styled-components";

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f3f8;
  margin-top: 16px;
  margin-bottom: 16px;
`;

function Divider() {
  return <Line />;
}

export default Divider;
