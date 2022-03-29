import { Fragment, memo } from "react";
import { ActionBar, StyledDescription } from "@/components/connect/styled";
import CloseButton from "@/components/connect/CloseButton";

function WrongNetwork({ network }) {
  return (
    <Fragment>
      <StyledDescription>
        Network not matched on Metamask. Please switch it to {network}.
      </StyledDescription>

      <ActionBar>
        <CloseButton />
      </ActionBar>
    </Fragment>
  );
}

export default memo(WrongNetwork);
