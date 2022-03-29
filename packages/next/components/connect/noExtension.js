import { ActionBar, StyledDescription } from "@/components/connect/styled";
import { memo } from "react";
import Closeable from "@/components/connect/closeable";
import GoToExtension from "@/components/connect/gotoExtensionButton";

function NoExtension({ open }) {
  return (
    <Closeable open={open}>
      <StyledDescription>
        Polkadot-js extension not detected. No web3 account could be found.
        Visit this page on a computer with polkadot-js extension.
      </StyledDescription>

      <ActionBar>
        <GoToExtension text="Polkadot{.js} Extension" />
      </ActionBar>
    </Closeable>
  );
}

export default memo(NoExtension);
