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
import { closeConnect } from "../../store/reducers/showConnectSlice";
import { useDispatch } from "react-redux";

function NoExtension({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
      <StyledCard>
        <CloseBar>
          <SvgClose onClick={closeModal} />
        </CloseBar>
        <StyledTitle>Connect Wallet</StyledTitle>

        <StyledDescription>
          Polkadot-js extension not detected. No web3 account could be found.
          Visit this page on a computer with polkadot-js extension.
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
            Polkadot{`{.js}`} Extension
          </Button>
        </ActionBar>
      </StyledCard>
    </StyledModal>
  );
}

export default memo(NoExtension);
