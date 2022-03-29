import { memo } from "react";
import {
  CloseBar,
  StyledCard,
  StyledModal,
  StyledTitle,
} from "@/components/connect/styled";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import SvgClose from "../../public/imgs/icons/close.svg";

function Closeable({ open, children }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
      <StyledCard>
        <CloseBar>
          <SvgClose onClick={closeModal} />
        </CloseBar>
        <StyledTitle>Connect Wallet</StyledTitle>

        {children}
      </StyledCard>
    </StyledModal>
  );
}

export default memo(Closeable);
