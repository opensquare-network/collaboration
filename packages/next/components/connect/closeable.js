import { memo } from "react";
import { StyledTitle } from "@/components/connect/styled";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import Modal from "@osn/common-ui/es/Modal";

function Closeable({ open, children }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Modal open={open} onClose={closeModal} footer={false}>
      <StyledTitle>Connect Wallet</StyledTitle>

      {children}
    </Modal>
  );
}

export default memo(Closeable);
