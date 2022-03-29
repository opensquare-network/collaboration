import { ActionBar, StyledDescription } from "@/components/connect/styled";
import Button from "@/components/button";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";
import Closeable from "@/components/connect/closeable";

function NotAccessible({ open }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Closeable open={open}>
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
    </Closeable>
  );
}

export default memo(NotAccessible);
