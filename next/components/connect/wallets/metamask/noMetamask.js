import { Fragment, memo } from "react";
import { ActionBar, StyledDescription } from "@/components/connect/styled";
import GoToExtension from "@/components/connect/gotoExtensionButton";

function NoMetamask() {
  return (
    <Fragment>
      <StyledDescription>
        Metamask not detected. Click following button to install it.
      </StyledDescription>

      <ActionBar>
        <GoToExtension link="https://metamask.io/" text="MetaMask Wallet" />
      </ActionBar>
    </Fragment>
  );
}

export default memo(NoMetamask);
