import { memo } from "react";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import Modal from "@osn/common-ui/es/Modal";

function Closeable({ open, children }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Modal
      className="w-[480px]"
      open={open}
      onClose={closeModal}
      footer={false}
    >
      {children}
    </Modal>
  );
}

export default memo(Closeable);
