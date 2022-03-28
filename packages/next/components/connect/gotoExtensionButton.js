import Button from "@/components/button";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import { memo } from "react";

function GoToExtension({ text }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
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
      {text}
    </Button>
  );
}

export default memo(GoToExtension);
