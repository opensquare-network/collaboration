import { ActionBar, StyledDescription } from "@/components/connect/styled";
import { Fragment, memo } from "react";
import GoToExtension from "@/components/connect/gotoExtensionButton";

function NoExtension() {
  return (
    <Fragment>
      <StyledDescription>
        Polkadot-js extension not detected. No web3 account could be found.
        Visit this page on a computer with polkadot-js extension.
      </StyledDescription>

      <ActionBar>
        <GoToExtension text="Polkadot{.js} Extension" />
      </ActionBar>
    </Fragment>
  );
}

export default memo(NoExtension);
