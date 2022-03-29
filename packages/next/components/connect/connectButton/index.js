import { memo } from "react";
import Button from "@/components/button";
import Metamask from "./metamask.svg";
import Polkadot from "./polkadot.svg";
import styled from "styled-components";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

function ConnectButton({ doConnect, isMetamask = false }) {
  return (
    <Button primary onClick={doConnect}>
      <Wrapper>
        {isMetamask ? <Metamask /> : <Polkadot />}
        Connect
      </Wrapper>
    </Button>
  );
}

export default memo(ConnectButton);
