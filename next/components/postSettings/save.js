import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@osn/common-ui";
import { loginAddressSelector } from "../../store/reducers/accountSlice";
import { popUpConnect } from "../../store/reducers/showConnectSlice";

function Save({ disabled, loading, onSave }) {
  const dispatch = useDispatch();
  const loginAddress = useSelector(loginAddressSelector);

  if (!loginAddress) {
    return (
      <Button large primary onClick={() => dispatch(popUpConnect())}>
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button
      large
      primary
      disabled={disabled}
      loading={loading}
      onClick={onSave}
    >
      Save Changes
    </Button>
  );
}

export default memo(Save);
