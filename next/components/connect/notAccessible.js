import { ActionBar, StyledDescription } from "@/components/connect/styled";
import Button from "@osn/common-ui/es/styled/Button";
import { Fragment, memo } from "react";
import { useDispatch } from "react-redux";
import { closeConnect } from "../../store/reducers/showConnectSlice";

function NotAccessible() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeConnect());

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default memo(NotAccessible);
