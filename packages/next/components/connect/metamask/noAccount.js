import { ActionBar, StyledDescription } from "@/components/connect/styled";
import CloseButton from "@/components/connect/CloseButton";
import { Fragment, memo } from "react";

function MetamaskNoAccount() {
  return (
    <Fragment>
      <StyledDescription>
        No accounts found from MetaMask. Please create or import some accounts
        first.
      </StyledDescription>

      <ActionBar>
        <CloseButton />
      </ActionBar>
    </Fragment>
  );
}

export default memo(MetamaskNoAccount);
