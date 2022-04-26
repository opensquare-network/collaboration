import { ActionBar, StyledDescription } from "@/components/connect/styled";
import { Fragment, memo } from "react";
import Button from "@osn/common-ui/es/styled/Button";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";

function NoAccount() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Fragment>
      <StyledDescription>
        Polkadot-js extension is connected, but no account found. Please create
        or import some accounts first.
      </StyledDescription>

      <ActionBar>
        <Button color="orange" onClick={closeModal}>
          Got it.
        </Button>
      </ActionBar>
    </Fragment>
  );
}

export default memo(NoAccount);
