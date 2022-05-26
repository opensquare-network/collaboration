import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAddressSelector,
  targetBalanceSelector,
  useProxySelector,
} from "../../store/reducers/accountSlice";
import { Button } from "@osn/common-ui";
import { popUpConnect } from "../../store/reducers/showConnectSlice";
import {
  balanceLoadingSelector,
  createProposalLoadingSelector,
} from "../../store/reducers/statusSlice";
import BigNumber from "bignumber.js";

function Publish({ threshold, onPublish }) {
  const dispatch = useDispatch();
  const useProxy = useSelector(useProxySelector);
  const loginAddress = useSelector(loginAddressSelector);
  const balanceLoading = useSelector(balanceLoadingSelector);
  const balance = useSelector(targetBalanceSelector);
  const belowThreshold = new BigNumber(balance).isLessThan(threshold);
  const createProposalLoading = useSelector(createProposalLoadingSelector);

  if (!loginAddress) {
    return (
      <Button large primary block onClick={() => dispatch(popUpConnect())}>
        Connect Wallet
      </Button>
    );
  }

  return (
    <Button
      block
      large
      primary
      onClick={onPublish}
      isLoading={balanceLoading || createProposalLoading}
      disabled={belowThreshold}
    >
      {useProxy ? "Proxy Publish" : "Publish"}
    </Button>
  );
}

export default memo(Publish);
