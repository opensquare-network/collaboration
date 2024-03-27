import styled from "styled-components";

const Panel = styled.div`
  padding: 32px;
  background: var(--fillBgPrimary);
  border: 1px solid var(--strokeBorderDefault);
  box-shadow: var(--shadowCardDefault);
  @media screen and (max-width: 800px) {
    padding: 20px;
    margin: 0 -20px;
  }
`;

export default Panel;
