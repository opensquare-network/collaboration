import React, { memo, useState } from "react";
import styled from "styled-components";
import Fold from "@/components/accordionPanel/fold";

const Header = styled.header`
  display: flex;
  justify-content: space-between;

  & > span.caret {
    cursor: pointer;
  }
`;

const Content = styled.article`
  display: ${(props) => (props.show ? "block" : "none")};
`;

function Accordion({ head, children }) {
  const [fold, setFold] = useState(false);

  return (
    <div>
      <Header>
        {head}
        <Fold fold={fold} setFold={setFold} />
      </Header>
      <Content show={!fold}>{children}</Content>
    </div>
  );
}

export default memo(Accordion);
