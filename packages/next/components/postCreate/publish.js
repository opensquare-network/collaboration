import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAddressSelector,
  targetBalanceSelector,
  useProxySelector,
} from "../../store/reducers/accountSlice";
import Button from "@/components/button";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import { balanceLoadingSelector } from "../../store/reducers/statusSlice";
import BigNumber from "bignumber.js";

function Publish({ threshold, onPublish }) {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);
  const loginAddress = useSelector(loginAddressSelector);
  const balanceLoading = useSelector(balanceLoadingSelector);
  const balance = useSelector(targetBalanceSelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);

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
      onClick={onPublish}
      isLoading={balanceLoading}
      disabled={belowThreshold}
    >
      {useProxy ? "Proxy Publish" : "Publish"}
    </Button>
  );
}

export default memo(Publish);
