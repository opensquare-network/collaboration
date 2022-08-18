import Button from "@osn/common-ui/es/styled/Button";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import { memo } from "react";

function CloseButton() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return <Button onClick={closeModal}>Close</Button>;
}

export default memo(CloseButton);
