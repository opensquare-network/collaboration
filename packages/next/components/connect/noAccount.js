import {
  ActionBar,
  CloseBar,
  StyledCard,
  StyledDescription,
  StyledModal,
  StyledTitle,
} from "@/components/connect/styled";
import SvgClose from "../../public/imgs/icons/close.svg";
import Button from "@/components/button";
import { memo } from "react";

function NoAccount({ closeModal, open }) {
  return (
    <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
      <StyledCard>
        <CloseBar>
          <SvgClose onClick={closeModal} />
        </CloseBar>
        <StyledTitle>Connect Wallet</StyledTitle>

        <StyledDescription>
          Polkadot-js extension is connected, but no account found. Please
          create or import some accounts first.
        </StyledDescription>

        <ActionBar>
          <Button
            color="orange"
            onClick={() => {
              closeModal();
              const newWindow = window.open(
                "https://polkadot.js.org/extension/",
                "_blank",
                "noopener,noreferrer"
              );
              if (newWindow) newWindow.opener = null;
            }}
          >
            Create/Import addresses
          </Button>
        </ActionBar>
      </StyledCard>
    </StyledModal>
  );
}

export default memo(NoAccount);
