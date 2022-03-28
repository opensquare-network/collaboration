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
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";

function NotAccessible({ open }) {
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
          Polkadot-js extension is detected but unaccessible, please go to
          Polkadot-js extension, settings, and check Manage Website Access
          section.
        </StyledDescription>

        <ActionBar>
          <Button color="orange" onClick={closeModal}>
            Got it.
          </Button>
        </ActionBar>
      </StyledCard>
    </StyledModal>
  );
}

export default memo(NotAccessible);
