import { ActionBar, StyledDescription } from "@/components/connect/styled";
import { memo } from "react";
import Closeable from "@/components/connect/closeable";
import Button from "@/components/button";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";

function NoAccount({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Closeable open={open}>
      <StyledDescription>
        Polkadot-js extension is connected, but no account found. Please create
        or import some accounts first.
      </StyledDescription>

      <ActionBar>
        <Button color="orange" onClick={closeModal}>
          Got it.
        </Button>
      </ActionBar>
    </Closeable>
  );
}

export default memo(NoAccount);
