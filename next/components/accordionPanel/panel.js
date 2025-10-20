import React, { memo, useState } from "react";
import Panel from "@/components/postDetail/panel";
import styled, { css } from "styled-components";
import Fold from "@/components/accordionPanel/fold";

const Header = styled.header`
  display: flex;
  padding: 0 32px;
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }

  ${(p) =>
    !p.secondary &&
    css`
      border-bottom: 1px solid var(--strokeBorderDefault);
      padding-bottom: 20px;
    `}

  justify-content: space-between;
`;

const Items = styled.article`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-top: 16px;
`;

const Card = styled(Panel)`
  padding: 32px 0;
  @media screen and (max-width: 800px) {
    padding: 20px 0;
  }
`;

function AccordionPanel({ head, children, secondary = false }) {
  const [fold, setFold] = useState(false);

  return (
    <Card>
      <Header secondary={secondary}>
        {head}
        <Fold fold={fold} setFold={setFold} />
      </Header>
      <Items show={!fold}>{children}</Items>
    </Card>
  );
}

export default memo(AccordionPanel);
